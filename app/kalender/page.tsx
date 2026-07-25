// src/app/kalender/page.tsx

import BackButton from '../../components/BackButton'; // Import komponen BackButton
import KalenderControl from '../../components/KalenderControl';

interface PageProps {
  searchParams: Promise<{
    bulan?: string;
    tahun?: string;
  }>;
}

// Kamus penerjemah hari ke Bahasa Indonesia
const hariMap: Record<string, string> = {
  Monday: 'Senin',
  Tuesday: 'Selasa',
  Wednesday: 'Rabu',
  Thursday: 'Kamis',
  Friday: 'Jumat',
  Saturday: 'Sabtu',
  Sunday: 'Minggu',
};

// Kamus penerjemah bulan Hijriah ke Bahasa Indonesia
const bulanHijriahMap: Record<string, string> = {
  Muḥarram: 'Muharam',
  Muharram: 'Muharam',
  Ṣafar: 'Safar',
  Safar: 'Safar',
  'Rabīʿ al-Awwal': 'Rabiul Awal',
  'Rabīʿ al-awwal': 'Rabiul Awal',
  "Rabi' al-awwal": 'Rabiul Awal',
  'Rabīʿ ath-Thānī': 'Rabiul Akhir',
  "Rabi' al-thani": 'Rabiul Akhir',
  'Jumādā al-Ūlā': 'Jumadil Awal',
  'Jumada al-ula': 'Jumadil Awal',
  'Jumādā al-Ākhirah': 'Jumadil Akhir',
  'Jumada al-akhirah': 'Jumadil Akhir',
  Rajab: 'Rajab',
  Shaʿbān: 'Syakban',
  "Sha'ban": 'Syakban',
  Ramaḍān: 'Ramadan',
  Ramadan: 'Ramadan',
  Shawwāl: 'Syawal',
  Shawwal: 'Syawal',
  'Dhū al-Qaʿdah': 'Zulkaidah',
  "Dhu al-qa'dah": 'Zulkaidah',
  'Dhū al-Ḥijjah': 'Zulhijjah',
  'Dhu al-hijjah': 'Zulhijjah',
};

// Kamus Tanggal Merah Nasional Indonesia
const liburNasional: Record<string, string> = {
  '2026-01-01': 'Tahun Baru Masehi',
  '2026-01-16': 'Isra Mikraj Nabi Muhammad SAW',
  '2026-02-17': 'Tahun Baru Imlek',
  '2026-03-19': 'Hari Suci Nyepi',
  '2026-03-20': 'Hari Raya Idul Fitri',
  '2026-03-21': 'Hari Raya Idul Fitri',
  '2026-04-03': 'Wafat Yesus Kristus',
  '2026-05-01': 'Hari Buruh Internasional',
  '2026-05-14': 'Kenaikan Yesus Kristus',
  '2026-05-27': 'Hari Raya Idul Adha',
  '2026-05-31': 'Hari Raya Waisak',
  '2026-06-16': 'Tahun Baru Islam',
  '2026-08-17': 'Hari Kemerdekaan RI',
  '2026-08-25': 'Maulid Nabi Muhammad SAW',
  '2026-12-25': 'Hari Raya Natal',
};

// Fungsi penerjemah hari peringatan Islam
function terjemahkanHariPenting(teks: string) {
  const kamus: Record<string, string> = {
    'Islamic New Year': 'Tahun Baru Islam',
    Ashura: 'Hari Asyura',
    'Mawlid an-Nabi': 'Maulid Nabi Muhammad SAW',
    'Mawlid (Birth) al-Nabi': 'Maulid Nabi Muhammad SAW',
    'Veiling of the Prophet Muhammad': 'Wafatnya Nabi Muhammad SAW',
    "Isra' and Mi'raj": 'Isra Mikraj',
    'Ramadan Begins': 'Awal Ramadan',
    'Eid al-Fitr': 'Hari Raya Idul Fitri',
    'Eid al-Adha': 'Hari Raya Idul Adha',
    'Arafah Day': 'Hari Arafah',
  };

  if (kamus[teks]) return kamus[teks];

  let hasil = teks;
  hasil = hasil.replace('Birth of', 'Kelahiran');
  hasil = hasil.replace('Death of', 'Wafatnya');
  hasil = hasil.replace('Veiling of', 'Wafatnya');
  hasil = hasil.replace('Demise of', 'Wafatnya');
  hasil = hasil.replace('Urs of', 'Haul');

  return hasil;
}

async function getKalenderLengkap(bulan: number, tahun: number) {
  try {
    const resCurrent = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${bulan}/${tahun}`, { cache: 'no-store' });
    const dataCurrent = await resCurrent.json();
    const currentHari = dataCurrent.data || [];

    const prevBulan = bulan === 1 ? 12 : bulan - 1;
    const prevTahun = bulan === 1 ? tahun - 1 : tahun;
    const resPrev = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${prevBulan}/${prevTahun}`, { cache: 'no-store' });
    const dataPrev = await resPrev.json();
    const prevHari = dataPrev.data || [];

    const firstDayIndex = new Date(tahun, bulan - 1, 1).getDay();
    const trailingHari = firstDayIndex > 0 ? prevHari.slice(-firstDayIndex) : [];

    const combinedHari = [...trailingHari, ...currentHari];

    const remainder = combinedHari.length % 7;
    if (remainder > 0) {
      const nextBulan = bulan === 12 ? 1 : bulan + 1;
      const nextTahun = bulan === 12 ? tahun + 1 : tahun;
      const resNext = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${nextBulan}/${nextTahun}`, { cache: 'no-store' });
      const dataNext = await resNext.json();
      const nextHari = dataNext.data || [];
      const leadingNextHari = nextHari.slice(0, 7 - remainder);
      combinedHari.push(...leadingNextHari);
    }

    const dateObj = new Date(tahun, bulan - 1, 1);
    const namaBulan = dateObj.toLocaleString('id-ID', { month: 'long' });

    return {
      namaBulan,
      tahun,
      bulan,
      hari: combinedHari,
    };
  } catch (error) {
    console.error('Gagal mengambil data kalender:', error);
    return null;
  }
}

export default async function KalenderPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const now = new Date();
  const currentBulan = searchParams.bulan ? Number(searchParams.bulan) : now.getMonth() + 1;
  const currentTahun = searchParams.tahun ? Number(searchParams.tahun) : now.getFullYear();

  const kalender = await getKalenderLengkap(currentBulan, currentTahun);

  if (!kalender) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
        <p className="text-red-500 font-bold mb-4">Maaf, gagal memuat kalender.</p>
        <BackButton />
      </main>
    );
  }

  const targetBulanStr = String(currentBulan).padStart(2, '0');

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-7xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Navigasi Kembali menggunakan BackButton (router.back()) */}
      <div className="mb-6 mt-4">
        <BackButton />
      </div>

      {/* Header Kalender */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-800 dark:text-emerald-500 mb-2 capitalize">
          {kalender.namaBulan} {kalender.tahun}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold text-xs md:text-sm">Kalender Islami & Nasional</p>
      </div>

      {/* PANEL KONTROL NAVIGASI */}
      <KalenderControl bulan={currentBulan} tahun={currentTahun} />

      {/* 🔴 BUNGKUSAN RESPONSIVE (SCROLL HORIZONTAL KHUSUS HP) 🔴 */}
      <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
        {/* Lebar minimal dipatok 800px agar tidak menciut di HP */}
        <div className="min-w-[800px]">
          {/* HEADER NAMA HARI */}
          <div className="grid grid-cols-7 gap-3 mb-3 text-center font-bold text-emerald-800 dark:text-emerald-400 text-sm md:text-base">
            <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl text-red-600 dark:text-red-400">Min</div>
            <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl">Sen</div>
            <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl">Sel</div>
            <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl">Rab</div>
            <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl">Kam</div>
            <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl">Jum</div>
            <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl">Sab</div>
          </div>

          {/* GRID KALENDER */}
          <div className="grid grid-cols-7 gap-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {kalender.hari.map((item: any, index: number) => {
              const masehi = item.gregorian;
              const hijriah = item.hijri;

              const [d, m, y] = masehi.date.split('-');
              const keyTanggal = `${y}-${m}-${d}`;
              const liburNasionalName = liburNasional[keyTanggal];

              const adaMomenIslam = hijriah.holidays && hijriah.holidays.length > 0;
              const isTanggalMerah = Boolean(liburNasionalName) || masehi.weekday.en === 'Sunday';

              const isBulanAktif = m === targetBulanStr;
              const namaBulanHijriah = bulanHijriahMap[hijriah.month.en] || hijriah.month.en;

              return (
                <div
                  key={index}
                  className={`p-3 md:p-4 rounded-2xl border transition-all flex flex-col justify-between min-h-[140px] ${
                    !isBulanAktif
                      ? 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/40 opacity-60'
                      : isTanggalMerah
                        ? 'bg-red-50/80 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 shadow-sm'
                        : adaMomenIslam
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700/50 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-2xl md:text-3xl font-bold ${!isBulanAktif ? 'text-slate-400 dark:text-slate-600' : isTanggalMerah ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>{masehi.day}</span>

                      <span
                        className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${!isBulanAktif ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400' : 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60'}`}
                      >
                        {hijriah.day}
                      </span>
                    </div>

                    <div className={`text-xs font-bold leading-tight ${!isBulanAktif ? 'text-slate-400 dark:text-slate-600' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {namaBulanHijriah} <br /> <span className="text-[11px] font-normal opacity-75">{hijriah.year}</span>
                    </div>
                  </div>

                  {isBulanAktif && (
                    <div className="space-y-1.5 mt-3">
                      {liburNasionalName && <div className="text-[9px] md:text-[10px] font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 px-1.5 py-1 rounded text-center leading-tight">🔴 {liburNasionalName}</div>}

                      {adaMomenIslam && (
                        <div>
                          {hijriah.holidays.map((namaLibur: string, hIndex: number) => (
                            <div key={hIndex} className="text-[9px] md:text-[10px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-200/60 dark:bg-emerald-800/50 px-1.5 py-1 rounded text-center leading-tight mb-1">
                              🌟 {terjemahkanHariPenting(namaLibur)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
