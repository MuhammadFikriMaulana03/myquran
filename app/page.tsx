// src/app/page.tsx

import { EQuran } from 'equran';
import Link from 'next/link';
import WidgetSholat from '../components/WidgetSholat';
import DaftarSuratList from '../components/DaftarSuratList';
import CountdownSholat from '../components/CountdownSholat';
import LastReadCard from '../components/LastReadCard';
import AdhanNotifier from '../components/AdhanNotifier';
import DarkModeToggle from '../components/DarkModeToggle';

async function getJadwalSholat(lokasi: string) {
  try {
    const urlLokasi = encodeURIComponent(`${lokasi}, Indonesia`);
    const res = await fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${urlLokasi}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.code !== 200) return null;
    return data.data.timings;
  } catch {
    return null;
  }
}

interface PageProps {
  searchParams: Promise<{ kota?: string }>;
}

interface JadwalTimings {
  Imsak: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const lokasiPilihan = searchParams.kota || 'Pamanukan, Subang';
  const quran = new EQuran();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let daftarSurat: any[] = [];
  let jadwal: JadwalTimings | null = null;

  try {
    daftarSurat = await quran.getAllSurat();
    jadwal = await getJadwalSholat(lokasiPilihan);
  } catch {
    daftarSurat = [];
    jadwal = null;
  }

  const waktuSholat = jadwal
    ? [
        { nama: 'Imsak', waktu: jadwal.Imsak },
        { nama: 'Subuh', waktu: jadwal.Fajr },
        { nama: 'Terbit', waktu: jadwal.Sunrise },
        { nama: 'Dzuhur', waktu: jadwal.Dhuhr },
        { nama: 'Ashar', waktu: jadwal.Asr },
        { nama: 'Maghrib', waktu: jadwal.Maghrib },
        { nama: 'Isya', waktu: jadwal.Isha },
      ]
    : [];

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-6xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* HEADER / HERO SECTION DENGAN TOMBOL DARK MODE */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm mb-8 gap-6 transition-colors">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-200/50 dark:border-emerald-800/40">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
            Dashboard Islami Profesional
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            MyQuran <span className="text-emerald-600 dark:text-emerald-400">Dashboard</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-lg">Temani hari-harimu dengan membaca Al-Quran, mendengarkan murottal, dan pengingat waktu sholat yang akurat.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="bg-emerald-600 dark:bg-emerald-700 text-white p-6 rounded-2xl shadow-md shadow-emerald-200 dark:shadow-none text-center min-w-[180px]">
            <p className="text-xs uppercase tracking-wider opacity-80 font-medium mb-1">Status Ibadah</p>
            <p className="text-lg font-bold">📖 Produktif</p>
          </div>
          {/* Tombol Toggle Dark Mode */}
          <DarkModeToggle />
        </div>
      </div>

      {/* WIDGET JADWAL SHOLAT */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-900 dark:to-slate-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-200/50 dark:shadow-none mb-8 text-white relative overflow-hidden border border-emerald-500/20">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full opacity-40 blur-3xl z-0"></div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold tracking-wide">Jadwal Sholat & Imsakiyah</h2>
            <p className="text-emerald-100 mt-1 capitalize text-sm font-medium">📍 Wilayah: {lokasiPilihan}</p>
          </div>

          <WidgetSholat defaultKota={lokasiPilihan} />

          {!jadwal && (
            <div className="text-center p-4 bg-red-500/20 border border-red-400/50 rounded-xl max-w-md mx-auto">
              <p className="text-white font-medium">Maaf, data jadwal sholat gagal dimuat.</p>
            </div>
          )}

          {jadwal && (
            <>
              {/* Tombol Aktivasi Notifikasi & Suara Adzan */}
              <AdhanNotifier timings={jadwal} />

              {/* Hitung Mundur Waktu Sholat Berikutnya */}
              <CountdownSholat timings={jadwal} />

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {waktuSholat.map((item, index) => (
                  <div key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-3 text-center transition-transform hover:scale-105">
                    <p className="text-emerald-100 text-xs font-semibold mb-1 uppercase tracking-wider">{item.nama}</p>
                    <p className="text-lg md:text-xl font-bold">{item.waktu}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MENU NAVIGASI FITUR UTAMA */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu Utama & Fitur</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            href="/doa"
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Doa Harian</h4>
              <p className="text-xs text-slate-400">Kumpulan doa pilihan</p>
            </div>
          </Link>

          <Link
            href="/kalender"
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Kalender Islami</h4>
              <p className="text-xs text-slate-400">Hijriah & hari libur</p>
            </div>
          </Link>

          <Link
            href="/asmaulhusna"
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Asmaul Husna</h4>
              <p className="text-xs text-slate-400">99 Nama Allah SWT</p>
            </div>
          </Link>

          <Link
            href="/favorit"
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Ayat Favorit</h4>
              <p className="text-xs text-slate-400">Bookmark ayat pilihan</p>
            </div>
          </Link>

          <Link
            href="/hadits"
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Hadits Pilihan</h4>
              <p className="text-xs text-slate-400">Tuntunan Rasulullah</p>
            </div>
          </Link>

          <Link
            href="/tasbih"
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Tasbih Digital</h4>
              <p className="text-xs text-slate-400">Hitung dzikir harian</p>
            </div>
          </Link>

          <Link
            href="/zakat"
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between col-span-2 sm:col-span-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Kalkulator Zakat</h4>
              <p className="text-xs text-slate-400">Kalkulasi harta</p>
            </div>
          </Link>
        </div>
      </div>

      {/* KARTU TERAKHIR DIBACA & DAFTAR SURAT AL-QURAN */}
      <LastReadCard />
      <DaftarSuratList daftarSurat={daftarSurat} />
    </main>
  );
}
