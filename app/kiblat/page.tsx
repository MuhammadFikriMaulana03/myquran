// src/app/kiblat/page.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import BackButton from '../../components/BackButton';

type Step = 'START' | 'CALIBRATION' | 'COMPASS';

export default function KiblatPage() {
  const [currentStep, setCurrentStep] = useState<Step>('START');
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Solusi Anti-Ngawur untuk HP yang sensornya kebalik dari pabrik
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Refs untuk perputaran continuous (anti patah-patah/snap)
  const lastHeadingRef = useRef<number>(0);
  const continuousHeadingRef = useRef<number>(0);
  const isAbsoluteMode = useRef<boolean>(false);

  // Koordinat Ka'bah
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  const calculateQibla = (lat: number, lng: number) => {
    const PI = Math.PI;
    const latK = KAABA_LAT * (PI / 180);
    const lngK = KAABA_LNG * (PI / 180);
    const latU = lat * (PI / 180);
    const lngU = lng * (PI / 180);

    const dLng = lngK - lngU;
    const y = Math.sin(dLng) * Math.cos(latK);
    const x = Math.cos(latU) * Math.sin(latK) - Math.sin(latU) * Math.cos(latK) * Math.cos(dLng);

    let qibla = Math.atan2(y, x) * (180 / PI);
    return (qibla + 360) % 360;
  };

  const updateContinuousHeading = (newHeading: number) => {
    let diff = newHeading - lastHeadingRef.current;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    continuousHeadingRef.current += diff;
    lastHeadingRef.current = newHeading;
    setCompassHeading(continuousHeadingRef.current);
  };

  const handleAbsoluteOrientation = useCallback((event: Event) => {
    const e = event as any;
    if (e.alpha !== null && e.alpha !== undefined) {
      isAbsoluteMode.current = true;
      updateContinuousHeading(360 - e.alpha);
    }
  }, []);

  const handleRelativeOrientation = useCallback((event: Event) => {
    if (isAbsoluteMode.current) return;
    const e = event as any;
    if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
      updateContinuousHeading(e.webkitCompassHeading);
    } else if (e.alpha !== null && e.alpha !== undefined) {
      updateContinuousHeading(360 - e.alpha);
    }
  }, []);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError('GPS tidak didukung browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const bearing = calculateQibla(position.coords.latitude, position.coords.longitude);
        setQiblaBearing(bearing);
      },
      (err) => {
        setError('Gagal membaca lokasi. Pastikan GPS HP Anda aktif.');
      },
      { enableHighAccuracy: true },
    );
  };

  const startProcess = async () => {
    setError('');
    try {
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        const doe = window.DeviceOrientationEvent as any;
        if (typeof doe.requestPermission === 'function') {
          const permission = await doe.requestPermission();
          if (permission !== 'granted') {
            setError('Izin kompas ditolak perangkat.');
            return;
          }
        }
        setCurrentStep('CALIBRATION');
        fetchLocation();
      } else {
        setError('Sensor Kompas tidak terdeteksi (Gunakan HP).');
      }
    } catch (err) {
      setError('Sistem menolak akses sensor.');
    }
  };

  const startCompass = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
      window.addEventListener('deviceorientation', handleRelativeOrientation, true);
    }
    setCurrentStep('COMPASS');
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
        window.removeEventListener('deviceorientation', handleRelativeOrientation, true);
      }
    };
  }, [handleAbsoluteOrientation, handleRelativeOrientation]);

  // Kalkulasi Rotasi Super Akurat
  const baseHeading = compassHeading ?? 0;
  const qiblaTarget = qiblaBearing ?? 0;

  // Jika HP user sensornya kebalik, kita balik rotasi cincin utamanya 180 derajat
  const displayHeading = isFlipped ? baseHeading + 180 : baseHeading;
  const realHeadingText = compassHeading !== null ? ((displayHeading % 360) + 360) % 360 : 0;

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-md min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center">
      <div className="w-full mb-4 mt-2 self-start">
        <BackButton />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-400 mb-1 tracking-tight">
          Qibla <span className="font-light">Compass</span>
        </h1>
        {currentStep === 'COMPASS' ? (
          <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-semibold">Terkunci ke Ka'bah</p>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">Persiapan Sensor</p>
        )}
      </div>

      {error && <div className="w-full bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded-r-xl text-sm mb-6 font-medium shadow-sm">{error}</div>}

      {/* TAHAP 1: START */}
      {currentStep === 'START' && !error && (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/20 dark:border-slate-800 text-center flex flex-col items-center gap-5 w-full">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-950 text-emerald-600 rounded-full flex items-center justify-center text-5xl shadow-inner border border-emerald-50 dark:border-emerald-800/50">
            🧭
          </div>
          <div>
            <h3 className="font-black text-xl text-slate-800 dark:text-white">Akses Lokasi & Kompas</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Izinkan akses <b>GPS</b> dan <b>Sensor Gyroscope</b> agar kami bisa menunjukkan arah presisi menuju Makkah.
            </p>
          </div>
          <button onClick={startProcess} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all active:scale-95 text-sm uppercase tracking-wider">
            Izinkan & Mulai
          </button>
        </div>
      )}

      {/* TAHAP 2: KALIBRASI */}
      {currentStep === 'CALIBRATION' && !error && (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/20 dark:border-slate-800 text-center flex flex-col items-center gap-6 w-full animate-in fade-in zoom-in duration-300">
          <h3 className="font-black text-xl text-slate-800 dark:text-white">Kalibrasi Perangkat</h3>

          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute text-emerald-500/20 dark:text-emerald-400/20 text-9xl">∞</div>
            <div className="text-4xl absolute z-10 animate-[spin_3s_linear_infinite] origin-bottom drop-shadow-2xl">📱</div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Putar HP Anda membentuk <b>angka 8 (∞)</b> di udara selama 3 detik untuk menyesuaikan sensor magnetik.
          </p>

          <button onClick={startCompass} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all active:scale-95 text-sm uppercase tracking-wider mt-2">
            Sudah Saya Putar
          </button>
        </div>
      )}

      {/* TAHAP 3: KOMPAS AKTIF */}
      {currentStep === 'COMPASS' && !error && (
        <div className="flex flex-col items-center w-full animate-in fade-in duration-700">
          {/* LINGKARAN KOMPAS PREMIUM */}
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center my-8">
            {/* Cincin Utama (Berputar mengikuti HP) */}
            <div
              className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.15)] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-[6px] border-emerald-50 dark:border-slate-800 flex items-center justify-center transition-transform duration-100 ease-linear"
              style={{ transform: `rotate(${-displayHeading}deg)` }}
            >
              {/* Ornamen Garis Mata Angin */}
              <div className="absolute w-full h-full border border-emerald-200/40 dark:border-emerald-800/40 rounded-full scale-[0.85]"></div>

              <span className="absolute top-2 font-black text-emerald-600 dark:text-emerald-500 text-xl drop-shadow-md">N</span>
              <span className="absolute right-4 font-bold text-slate-400 text-sm">E</span>
              <span className="absolute bottom-2 font-bold text-slate-400 text-sm">S</span>
              <span className="absolute left-4 font-bold text-slate-400 text-sm">W</span>

              {/* Trik Logika Baru: Jarum Kiblat Ditanam Di Dalam Cincin Utara */}
              {/* Jadi tidak perlu hitung pengurangan lagi, pasti nyangkut ke koordinat yang tepat! */}
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out z-10" style={{ transform: `rotate(${qiblaTarget}deg)` }}>
                {/* Desain Jarum Mewah */}
                <div className="flex flex-col items-center transform -translate-y-[4.8rem]">
                  {/* Ikon Ka'bah Minimalis SVG */}
                  <div className="w-10 h-10 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/40 mb-1.5 border-2 border-white dark:border-slate-900 z-10">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M5 4h14v16H5z" />
                      <path d="M5 9h14v2H5z" fill="#D4AF37" />
                    </svg>
                  </div>
                  {/* Batang Jarum */}
                  <div className="w-1.5 h-16 bg-gradient-to-b from-emerald-600 to-transparent dark:from-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Pivot Center Point */}
            <div className="w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full z-20 shadow-md border-[3px] border-white dark:border-slate-900"></div>
          </div>

          {/* INFORMASI KOORDINAT & TOMBOL FIX */}
          <div className="w-full flex flex-col gap-4 mt-2">
            {/* Tombol Balik Arah (Penyelamat HP Sensor Terbalik) */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="mx-auto flex items-center gap-2 bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full text-xs font-bold transition-colors border border-slate-300/50 dark:border-slate-700"
            >
              <span>{isFlipped ? '✅ Arah Dibalik' : '🔄 Jarum Berlawanan? Klik Ini'}</span>
            </button>

            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 w-full text-center">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Titik Makkah</p>
                  <p className="font-black text-xl text-emerald-700 dark:text-emerald-400">{qiblaBearing !== null ? `${qiblaTarget.toFixed(1)}°` : '--'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Arah Hadap</p>
                  <p className="font-black text-xl text-slate-700 dark:text-slate-200">{compassHeading !== null ? `${realHeadingText.toFixed(1)}°` : '--'}</p>
                </div>
              </div>

              {!qiblaBearing && <p className="text-xs text-amber-500 mt-4 animate-pulse font-medium">Mencari satelit GPS... (Pastikan di luar ruangan)</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
