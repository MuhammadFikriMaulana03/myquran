// src/app/kiblat/page.tsx
'use client';

import { useState, useEffect } from 'react';
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

  // Rumus menghitung sudut arah kiblat dari lokasi user
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
        setError('Gagal mendapatkan lokasi. Pastikan GPS aktif dan diizinkan.');
        console.error(err);
      },
      { enableHighAccuracy: true },
    );
  };

  const startCompass = async () => {
    setIsCalibrating(true);

    // Khusus perangkat iOS (iPhone/iPad) butuh izin eksplisit
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
          getLocationAndQibla();
        } else {
          setError('Izin kompas ditolak oleh perangkat.');
        }
      } catch (err) {
        setError('Gagal meminta izin kompas.');
      }
    } else {
      // Untuk Android dan browser biasa
      setPermissionGranted(true);
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      // Fallback jika deviceorientationabsolute tidak didukung
      window.addEventListener('deviceorientation', handleOrientation, true);
      getLocationAndQibla();
    }
    setIsCalibrating(false);
  };

  const handleOrientation = (e: any) => {
    let heading = null;
    // iOS menggunakan webkitCompassHeading
    if (e.webkitCompassHeading) {
      heading = e.webkitCompassHeading;
    }
    // Android menggunakan alpha pada event absolute
    else if (e.absolute && e.alpha !== null) {
      heading = 360 - e.alpha;
    }
    // Fallback Android biasa
    else if (e.alpha !== null) {
      heading = 360 - e.alpha;
    }

    if (heading !== null) {
      setCompassHeading(heading);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
    };
  }, []);

  // Perhitungan derajat putaran jarum kiblat
  const qiblaRotation = qiblaBearing !== null && compassHeading !== null ? qiblaBearing - compassHeading : 0;

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-md min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center">
      <div className="w-full mb-6 mt-4 self-start">
        <BackButton />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Arah Kiblat</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Temukan arah Ka'bah dari lokasi Anda saat ini.</p>
      </div>

      {!permissionGranted ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-4 w-full">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-2">🧭</div>
          <h3 className="font-bold text-lg">Akses Kompas & GPS</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Kami memerlukan izin akses GPS dan Sensor Gerak (Kompas) untuk menentukan arah Kiblat dengan akurat.</p>
          <button onClick={startCompass} disabled={isCalibrating} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95">
            {isCalibrating ? 'Mempersiapkan...' : 'Aktifkan Kompas'}
          </button>
          {error && <p className="text-red-500 text-xs mt-2 font-medium bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">{error}</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-8">
            {/* Cincin Kompas Luar (Berputar mengikuti HP) */}
            <div
              className="absolute inset-0 rounded-full border-[12px] border-emerald-100 dark:border-emerald-900/50 shadow-xl transition-transform duration-300 ease-out flex items-center justify-center"
              style={{ transform: `rotate(${compassHeading !== null ? -compassHeading : 0}deg)` }}
            >
              <span className="absolute top-2 font-extrabold text-emerald-600 dark:text-emerald-400 text-lg">U</span>
              <span className="absolute right-4 font-bold text-slate-400 text-sm">T</span>
              <span className="absolute bottom-2 font-bold text-slate-400 text-sm">S</span>
              <span className="absolute left-4 font-bold text-slate-400 text-sm">B</span>

              {/* Garis ornamen kompas */}
              <div className="w-full h-full border border-emerald-200/50 dark:border-emerald-800/50 rounded-full scale-75"></div>
            </div>

            {/* Jarum Kiblat (Mengarah ke Ka'bah) */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out z-10" style={{ transform: `rotate(${qiblaRotation}deg)` }}>
              <div className="flex flex-col items-center transform -translate-y-16">
                <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-transparent border-b-emerald-600 dark:border-b-emerald-400 mb-1 drop-shadow-md"></div>
                <div className="bg-emerald-600 dark:bg-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span>🕋</span> Kiblat
                </div>
              </div>
            </div>

            {/* Titik Tengah */}
            <div className="w-4 h-4 bg-emerald-800 dark:bg-emerald-300 rounded-full z-20 shadow-sm border-2 border-white dark:border-slate-800"></div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-full text-center mt-4">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-bold">Informasi Kordinat</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-500 mb-1">Derajat Kiblat</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{qiblaBearing ? `${qiblaBearing.toFixed(1)}°` : 'Menghitung...'}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-500 mb-1">Arah HP Anda</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{compassHeading ? `${compassHeading.toFixed(1)}°` : 'Mendeteksi...'}</p>
              </div>
            </div>
            <p className="text-[11px] italic text-slate-400 mt-4 leading-relaxed">*Jauhkan HP dari magnet atau logam. Putar HP Anda membentuk angka 8 jika arah kompas terasa tidak akurat.</p>
          </div>
        </div>
      )}
    </main>
  );
}
