// src/components/AdhanNotifier.tsx
'use client';

import { useEffect, useState } from 'react';

interface Timing {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface Props {
  timings: Timing;
}

export default function AdhanNotifier({ timings }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [isActivated, setIsActivated] = useState(false);

  // State untuk menampilkan pop-up alarm keren di layar saat waktu sholat tiba
  const [alarmData, setAlarmData] = useState<{ nama: string; waktu: string } | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    queueMicrotask(() => setIsMounted(true));

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('Service Worker gagal:', err);
      });
    }

    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'granted') {
        setIsActivated(true);
      }
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Browser ini tidak mendukung notifikasi.');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === 'granted') {
      setIsActivated(true);
      showPwaNotification('Alhamdulillah Berhasil!', 'Notifikasi waktu sholat dan suara adzan kini aktif.');
    } else {
      alert('Izin notifikasi ditolak oleh browser.');
    }
  };

  const showPwaNotification = (title: string, body: string) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.showNotification(title, {
            body: body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
          });
        })
        .catch(() => {
          new Notification(title, { body, icon: '/favicon.ico' });
        });
    } else {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  };

  useEffect(() => {
    if (!timings) return;

    let lastTriggeredMinute = '';

    const checkPrayerTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTimeStr = `${hours}:${minutes}`;
      const currentSecond = now.getSeconds();

      if (currentSecond !== 0) return;

      const daftarSholat = [
        { nama: 'Subuh (Fajr)', waktu: timings.Fajr },
        { nama: 'Dzuhur', waktu: timings.Dhuhr },
        { nama: 'Ashar', waktu: timings.Asr },
        { nama: 'Maghrib', waktu: timings.Maghrib },
        { nama: 'Isya', waktu: timings.Isha },
      ];

      for (const sholat of daftarSholat) {
        if (!sholat.waktu) continue;
        const cleanWaktu = sholat.waktu.substring(0, 5);

        if (currentTimeStr === cleanWaktu && lastTriggeredMinute !== currentTimeStr) {
          lastTriggeredMinute = currentTimeStr;

          // Putar audio lokal
          const audio = new Audio('/adhan.mp3');
          audio.play().catch((err) => console.log('Audio diblokir:', err));
          setCurrentAudio(audio);

          // Munculkan Pop-up Alarm Keren di Layar
          setAlarmData({ nama: sholat.nama, waktu: cleanWaktu });

          // Munculkan notifikasi sistem PWA
          showPwaNotification(`Waktu ${sholat.nama} Telah Tiba`, `Mari segera menunaikan ibadah sholat ${sholat.nama} (${cleanWaktu}).`);
          break;
        }
      }
    };

    const interval = setInterval(checkPrayerTime, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setAlarmData(null);
  };

  if (!isMounted) {
    return (
      <div className="bg-amber-500/25 border border-amber-400/40 text-white p-4 rounded-2xl mb-6 text-center shadow-sm">
        <p className="text-xs font-semibold mb-2">Ingin agar HP/Laptop berbunyi Adzan saat waktu sholat tiba?</p>
        <div className="bg-white/50 text-amber-900 font-bold px-5 py-2.5 rounded-xl text-xs inline-block">Memuat...</div>
      </div>
    );
  }

  return (
    <>
      {/* KARTU STATUS DI DASHBOARD */}
      {isActivated ? (
        <div className="mb-4 text-center">
          <div className="bg-emerald-700/45 border border-emerald-400/20 text-emerald-100 text-xs px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 mb-2 shadow-sm">
            <span>🔔</span> Alarm Adzan & Notifikasi PWA Aktif
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                const audio = new Audio('/adhan.mp3');
                audio
                  .play()
                  .then(() => {
                    setCurrentAudio(audio);
                    setAlarmData({ nama: 'Tes Sholat', waktu: 'Sekarang' });
                  })
                  .catch((err) => {
                    alert('Gagal memutar audio: ' + err);
                  });
              }}
              className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer border border-white/30"
            >
              🧪 Tes Suara & Pop-up Alarm
            </button>

            <button
              onClick={() => {
                showPwaNotification('🧪 Tes Notifikasi PWA', 'Alhamdulillah, notifikasi PWA berhasil muncul!');
              }}
              className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer border border-white/30"
            >
              🔔 Tes Notifikasi Layar
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-amber-500/25 border border-amber-400/40 text-white p-4 rounded-2xl mb-6 text-center shadow-sm">
          <p className="text-xs font-semibold mb-2">Ingin agar HP/Laptop berbunyi Adzan saat waktu sholat tiba?</p>
          <button onClick={requestNotificationPermission} className="bg-white text-amber-900 font-bold px-5 py-2.5 rounded-xl shadow-md text-xs hover:bg-amber-50 transition-all cursor-pointer">
            🔔 Aktifkan Suara Adzan & Notifikasi
          </button>
        </div>
      )}

      {/* POP-UP MODAL ALARM KEREN SAAT WAKTU Tiba */}
      {alarmData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/40 text-white w-full max-w-md p-6 rounded-3xl shadow-2xl text-center relative overflow-hidden">
            {/* Efek Cahaya Dekoratif */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>

            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">🕌</div>

            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Waktu Sholat Telah Tiba</span>

            <h2 className="text-2xl font-extrabold mt-3 text-slate-100">{alarmData.nama}</h2>
            <p className="text-slate-400 text-sm mt-1">Pukul {alarmData.waktu}. Mari persiapkan diri untuk menunaikan ibadah sholat.</p>

            <div className="mt-6 flex flex-col gap-2">
              <button onClick={stopAudio} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg cursor-pointer text-sm">
                Tutup & Matikan Adzan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
