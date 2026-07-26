// src/app/kiblat/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import BackButton from '../../components/BackButton';

// Definisikan tipe step aplikasi
type Step = 'START' | 'CALIBRATION' | 'COMPASS';

export default function KiblatPage() {
  const [currentStep, setCurrentStep] = useState<Step>('START');
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  // Rumus menghitung arah kiblat
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

  // 1. Minta Izin Sensor (iOS & Android)
  const requestPermissionAndCalibrate = async () => {
    setError('');
    try {
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        const doe = window.DeviceOrientationEvent as any;

        if (typeof doe.requestPermission === 'function') {
          const permission = await doe.requestPermission();
          if (permission !== 'granted') {
            setError('Izin kompas ditolak oleh perangkat iOS Anda.');
            return;
          }
        }

        // Pindah ke layar kalibrasi sekaligus tarik data GPS di background
        setCurrentStep('CALIBRATION');
        fetchLocation();
      } else {
        setError('Sensor Kompas tidak didukung di perangkat ini (Gunakan HP).');
      }
    } catch (err) {
      setError('Gagal meminta izin sensor.');
    }
  };

  // Ambil lokasi GPS
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError('GPS tidak didukung di browser ini.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const bearing = calculateQibla(position.coords.latitude, position.coords.longitude);
        setQiblaBearing(bearing);
      },
      (err) => {
        setError('Gagal membaca GPS. Pastikan Lokasi menyala.');
      },
      { enableHighAccuracy: true },
    );
  };

  // Fungsi membaca putaran HP
  const handleOrientation = useCallback((event: Event) => {
    const e = event as any;
    let heading: number | null = null;

    if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
      heading = e.webkitCompassHeading;
    } else if (e.absolute === true && e.alpha !== null && e.alpha !== undefined) {
      heading = 360 - e.alpha;
    } else if (e.alpha !== null && e.alpha !== undefined) {
      heading = 360 - e.alpha;
    }

    if (heading !== null) {
      setCompassHeading(heading);
    }
  }, []);

  // 2. Selesai Kalibrasi, Mulai Kompas
  const startCompass = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    setCurrentStep('COMPASS');
  };

  // Bersihkan sensor saat halaman ditutup
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      }
    };
  }, [handleOrientation]);

  // Anti-Null TypeScript untuk CSS
  const safeHeading = compassHeading ?? 0;
  const safeQibla = qiblaBearing ?? 0;
  const qiblaRotation = qiblaBearing !== null && compassHeading !== null ? qiblaBearing - compassHeading : 0;

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-md min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center">
      <div className="w-full mb-6 mt-4 self-start">
        <BackButton />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Arah Kiblat</h1>
        {currentStep === 'COMPASS' ? <p className="text-slate-500 dark:text-slate-400 text-sm">Menunjuk ke arah Makkah.</p> : <p className="text-slate-500 dark:text-slate-400 text-sm">Persiapan sensor kompas.</p>}
      </div>

      {error && <div className="w-full bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm text-center mb-6 font-medium">{error}</div>}

      {/* TAHAP 1: START */}
      {currentStep === 'START' && !error && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-4 w-full animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-2 shadow-inner">🧭</div>
          <h3 className="font-bold text-xl text-slate-800 dark:text-white">Akses Sensor</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Untuk menemukan arah Kiblat dengan akurat, izinkan aplikasi ini mengakses <b>Lokasi (GPS)</b> dan <b>Sensor Gerak</b> HP Anda.
          </p>
          <button onClick={requestPermissionAndCalibrate} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-sm">
            Lanjutkan
          </button>
        </div>
      )}

      {/* TAHAP 2: TUTORIAL KALIBRASI */}
      {currentStep === 'CALIBRATION' && !error && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-6 w-full animate-in fade-in slide-in-from-right duration-300">
          <h3 className="font-bold text-xl text-slate-800 dark:text-white">Kalibrasi Kompas</h3>

          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Animasi Angka 8 */}
            <div className="absolute text-emerald-500/20 dark:text-emerald-400/20 text-9xl">∞</div>
            {/* Icon HP yang bergerak */}
            <div className="text-4xl absolute z-10 animate-[spin_3s_linear_infinite] origin-bottom drop-shadow-lg">📱</div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Penting untuk Akurasi!</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Pegang HP Anda lalu putar membentuk <b>angka 8 (∞)</b> di udara selama 3-5 detik. Jauhkan dari benda bermagnet/besi.
            </p>
          </div>

          <button onClick={startCompass} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-sm mt-2">
            Saya Sudah Kalibrasi
          </button>
        </div>
      )}

      {/* TAHAP 3: KOMPAS AKTIF */}
      {currentStep === 'COMPASS' && !error && (
        <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
          {/* LINGKARAN KOMPAS */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-6">
            {/* Cincin Arah Mata Angin */}
            <div
              className="absolute inset-0 rounded-full border-[14px] border-emerald-50 dark:border-slate-800 shadow-2xl flex items-center justify-center transition-transform duration-100 ease-linear"
              style={{ transform: `rotate(${-safeHeading}deg)` }}
            >
              <span className="absolute top-3 font-black text-emerald-600 dark:text-emerald-400 text-xl">U</span>
              <span className="absolute right-4 font-bold text-slate-400 text-sm">T</span>
              <span className="absolute bottom-3 font-bold text-slate-400 text-sm">S</span>
              <span className="absolute left-4 font-bold text-slate-400 text-sm">B</span>

              <div className="w-full h-full border-2 border-emerald-100/50 dark:border-emerald-900/30 rounded-full scale-[0.85]"></div>
            </div>

            {/* Jarum Kiblat */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-linear z-10" style={{ transform: `rotate(${qiblaRotation}deg)` }}>
              <div className="flex flex-col items-center transform -translate-y-[4.5rem]">
                <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[35px] border-transparent border-b-emerald-600 dark:border-b-emerald-400 mb-2 drop-shadow-md"></div>
                <div className="bg-emerald-600 dark:bg-emerald-400 text-white text-[11px] font-black tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-500 dark:border-emerald-300">
                  <span>🕋</span> KIBLAT
                </div>
              </div>
            </div>

            {/* Titik Tengah */}
            <div className="w-5 h-5 bg-emerald-800 dark:bg-emerald-300 rounded-full z-20 shadow-md border-4 border-white dark:border-slate-900"></div>
          </div>

          {/* INFORMASI KOORDINAT */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 w-full text-center mt-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Sudut Ka'bah</p>
                <p className="font-black text-lg text-emerald-700 dark:text-emerald-400">{qiblaBearing !== null ? `${safeQibla.toFixed(1)}°` : '...'}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Arah HP</p>
                <p className="font-black text-lg text-slate-700 dark:text-slate-300">{compassHeading !== null ? `${safeHeading.toFixed(1)}°` : '...'}</p>
              </div>
            </div>

            {!qiblaBearing && <p className="text-xs text-amber-500 mt-4 animate-pulse font-medium">⏳ Sedang mengunci lokasi GPS...</p>}
          </div>
        </div>
      )}
    </main>
  );
}
