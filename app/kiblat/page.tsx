// src/app/kiblat/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import BackButton from '../../components/BackButton';

export default function KiblatPage() {
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  // Koordinat mutlak Ka'bah (Makkah)
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  // Rumus Trigonometri Bola untuk menghitung arah kiblat
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

  // Pengecekan Orientasi Sensor secara Aman (Type-Safe & Stabil)
  const handleOrientation = useCallback((event: Event) => {
    // Mem-bypass TypeScript strict mode untuk properti non-standar iOS/Android
    const e = event as any;
    let heading: number | null = null;

    if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
      // Pembacaan Kompas untuk iOS (iPhone)
      heading = e.webkitCompassHeading;
    } else if (e.alpha !== null && e.alpha !== undefined) {
      // Pembacaan Kompas untuk Android (360 - alpha)
      heading = 360 - e.alpha;
    }

    if (heading !== null) {
      setCompassHeading(heading);
    }
  }, []);

  const getLocationAndQibla = () => {
    if (!navigator.geolocation) {
      setError('GPS tidak didukung di perangkat/browser Anda.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const bearing = calculateQibla(latitude, longitude);
        setQiblaBearing(bearing);
      },
      (err) => {
        setError('Gagal membaca lokasi. Pastikan GPS (Lokasi) HP menyala dan diizinkan.');
        console.error(err);
      },
      { enableHighAccuracy: true },
    );
  };

  const startCompass = async () => {
    setIsCalibrating(true);
    setError('');

    try {
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        const doe = window.DeviceOrientationEvent as any;

        // Cek jika perangkat butuh izin klik (seperti iOS 13+)
        if (typeof doe.requestPermission === 'function') {
          const permission = await doe.requestPermission();
          if (permission === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation, true);
            getLocationAndQibla();
          } else {
            setError('Izin kompas ditolak oleh pengaturan perangkat iOS Anda.');
          }
        } else {
          // Untuk Android atau browser biasa
          setPermissionGranted(true);
          window.addEventListener('deviceorientationabsolute', handleOrientation, true);
          window.addEventListener('deviceorientation', handleOrientation, true);
          getLocationAndQibla();
        }
      } else {
        setError('Sensor Kompas tidak terdeteksi di perangkat Anda (hanya berfungsi di HP).');
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem saat menyalakan sensor.');
    } finally {
      setIsCalibrating(false);
    }
  };

  // Bersihkan memory event listener ketika pindah halaman
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      }
    };
  }, [handleOrientation]);

  // Pastikan tipe data valid saat akan digambar ke CSS
  const safeCompassHeading = compassHeading !== null ? compassHeading : 0;
  const safeQiblaBearing = qiblaBearing !== null ? qiblaBearing : 0;

  // Derajat putaran jarum Makkah
  const qiblaRotation = qiblaBearing !== null && compassHeading !== null ? qiblaBearing - compassHeading : 0;

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-md min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center">
      <div className="w-full mb-6 mt-4 self-start">
        <BackButton />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Arah Kiblat</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Temukan arah presisi Ka'bah dari lokasi Anda.</p>
      </div>

      {!permissionGranted ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-4 w-full">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-2">🧭</div>
          <h3 className="font-bold text-lg">Akses Kompas & GPS</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Kami memerlukan izin akses GPS dan Sensor Gyroscope untuk menentukan arah Kiblat Anda.</p>
          <button onClick={startCompass} disabled={isCalibrating} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50">
            {isCalibrating ? 'Memuat Sensor...' : 'Aktifkan Sensor Arah'}
          </button>
          {error && <p className="text-red-500 text-xs mt-2 font-medium bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">{error}</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {error && <p className="text-red-500 text-xs mb-4 text-center bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">{error}</p>}

          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-8">
            {/* Cincin Kompas Luar (Berputar menjaga arah Utara Hape) */}
            <div
              className="absolute inset-0 rounded-full border-[12px] border-emerald-100 dark:border-emerald-900/50 shadow-xl transition-transform duration-[50ms] ease-linear flex items-center justify-center"
              style={{ transform: `rotate(${-safeCompassHeading}deg)` }}
            >
              <span className="absolute top-2 font-extrabold text-emerald-600 dark:text-emerald-400 text-lg">U</span>
              <span className="absolute right-4 font-bold text-slate-400 text-sm">T</span>
              <span className="absolute bottom-2 font-bold text-slate-400 text-sm">S</span>
              <span className="absolute left-4 font-bold text-slate-400 text-sm">B</span>

              {/* Garis pemanis kompas */}
              <div className="w-full h-full border border-emerald-200/50 dark:border-emerald-800/50 rounded-full scale-75"></div>
            </div>

            {/* Jarum Kiblat (Menembak lurus ke Ka'bah) */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[50ms] ease-linear z-10" style={{ transform: `rotate(${qiblaRotation}deg)` }}>
              <div className="flex flex-col items-center transform -translate-y-16">
                <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-transparent border-b-emerald-600 dark:border-b-emerald-400 mb-1 drop-shadow-md"></div>
                <div className="bg-emerald-600 dark:bg-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span>🕋</span> Kiblat
                </div>
              </div>
            </div>

            {/* Titik Pivot Tengah */}
            <div className="w-4 h-4 bg-emerald-800 dark:bg-emerald-300 rounded-full z-20 shadow-sm border-2 border-white dark:border-slate-800"></div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-full text-center mt-4">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-bold">Informasi Koordinat</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-500 mb-1">Sudut Ka'bah</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{qiblaBearing !== null ? `${safeQiblaBearing.toFixed(1)}°` : 'Menghitung...'}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-500 mb-1">Arah HP Anda</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{compassHeading !== null ? `${safeCompassHeading.toFixed(1)}°` : 'Mendeteksi...'}</p>
              </div>
            </div>
            <p className="text-[11px] italic text-slate-400 mt-4 leading-relaxed">
              *Jauhkan HP dari benda magnetik. Gerakkan HP membentuk angka 8 <b>(∞)</b> di udara untuk mengkalibrasi arah kompas.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
