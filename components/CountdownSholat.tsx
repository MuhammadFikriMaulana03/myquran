// src/components/CountdownSholat.tsx
'use client';

import { useState, useEffect } from 'react';

interface Timing {
  Imsak: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface Props {
  timings: Timing;
}

export default function CountdownSholat({ timings }: Props) {
  const [nextPrayer, setNextPrayer] = useState<{ nama: string; waktu: string; sisaWaktu: string } | null>(null);

  useEffect(() => {
    if (!timings) return;

    const calculateNextPrayer = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentTotalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;

      const daftarSholat = [
        { nama: 'Subuh (Fajr)', waktu: timings.Fajr },
        { nama: 'Dzuhur', waktu: timings.Dhuhr },
        { nama: 'Ashar', waktu: timings.Asr },
        { nama: 'Maghrib', waktu: timings.Maghrib },
        { nama: 'Isya', waktu: timings.Isha },
      ];

      let found = null;

      for (const sholat of daftarSholat) {
        if (!sholat.waktu) continue;
        const [h, m] = sholat.waktu.split(':').map(Number);
        const sholatTotalSeconds = h * 3600 + m * 60;

        if (sholatTotalSeconds > currentTotalSeconds) {
          const diff = sholatTotalSeconds - currentTotalSeconds;
          const hours = Math.floor(diff / 3600);
          const minutes = Math.floor((diff % 3600) / 60);
          const seconds = diff % 60;

          found = {
            nama: sholat.nama,
            waktu: sholat.waktu,
            sisaWaktu: `${hours.toString().padStart(2, '0')}j : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}d`,
          };
          break;
        }
      }

      // Jika sudah lewat semua sholat hari ini, berarti sholat berikutnya adalah Subuh besok
      if (!found && daftarSholat[0].waktu) {
        const [h, m] = daftarSholat[0].waktu.split(':').map(Number);
        const sholatTotalSeconds = h * 3600 + m * 60;
        const diff = 24 * 3600 - currentTotalSeconds + sholatTotalSeconds;
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        found = {
          nama: daftarSholat[0].nama,
          waktu: daftarSholat[0].waktu,
          sisaWaktu: `${hours.toString().padStart(2, '0')}j : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}d`,
        };
      }

      setNextPrayer(found);
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  if (!nextPrayer) return null;

  return (
    <div className="bg-emerald-700/60 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-4 mb-6 text-center max-w-md mx-auto shadow-inner">
      <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-1">
        Menuju Waktu <span className="text-white font-bold">{nextPrayer.nama}</span> ({nextPrayer.waktu})
      </p>
      <p className="text-2xl md:text-3xl font-extrabold tracking-wider text-white font-mono">{nextPrayer.sisaWaktu}</p>
    </div>
  );
}
