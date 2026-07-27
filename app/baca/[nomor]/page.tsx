// src/app/baca/[nomor]/page.tsx

import { EQuran } from 'equran';
import AudioPlayer from '../../../components/AudioPlayer';
import BackButton from '../../../components/BackButton';
import AyatListWrapper from '../../../components/AyatListWrapper';

interface PageProps {
  params: Promise<{ nomor: string }>;
}

// 🌟 DATABASE MINI: Titik Mulai 30 Juz Standar Mushaf 🌟
const juzStarts = [
  { juz: 1, surat: 1, ayat: 1 },
  { juz: 2, surat: 2, ayat: 142 },
  { juz: 3, surat: 2, ayat: 253 },
  { juz: 4, surat: 3, ayat: 93 },
  { juz: 5, surat: 4, ayat: 24 },
  { juz: 6, surat: 4, ayat: 148 },
  { juz: 7, surat: 5, ayat: 82 },
  { juz: 8, surat: 6, ayat: 111 },
  { juz: 9, surat: 7, ayat: 88 },
  { juz: 10, surat: 8, ayat: 41 },
  { juz: 11, surat: 9, ayat: 93 },
  { juz: 12, surat: 11, ayat: 6 },
  { juz: 13, surat: 12, ayat: 53 },
  { juz: 14, surat: 15, ayat: 1 },
  { juz: 15, surat: 17, ayat: 1 },
  { juz: 16, surat: 18, ayat: 75 },
  { juz: 17, surat: 21, ayat: 1 },
  { juz: 18, surat: 23, ayat: 1 },
  { juz: 19, surat: 25, ayat: 21 },
  { juz: 20, surat: 27, ayat: 56 },
  { juz: 21, surat: 29, ayat: 46 },
  { juz: 22, surat: 33, ayat: 31 },
  { juz: 23, surat: 36, ayat: 28 },
  { juz: 24, surat: 39, ayat: 32 },
  { juz: 25, surat: 41, ayat: 47 },
  { juz: 26, surat: 46, ayat: 1 },
  { juz: 27, surat: 51, ayat: 31 },
  { juz: 28, surat: 58, ayat: 1 },
  { juz: 29, surat: 67, ayat: 1 },
  { juz: 30, surat: 78, ayat: 1 },
];

const getJuzNumber = (surat: number, ayat: number) => {
  for (let i = juzStarts.length - 1; i >= 0; i--) {
    const j = juzStarts[i];
    if (surat > j.surat || (surat === j.surat && ayat >= j.ayat)) {
      return j.juz;
    }
  }
  return 1;
};

export default async function BacaSuratPage(props: PageProps) {
  const params = await props.params;
  const nomorSurat = Number(params.nomor);
  const quran = new EQuran();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let surat: any = null;
  try {
    surat = await quran.getSurat(nomorSurat);
  } catch {
    surat = null;
  }

  if (!surat) {
    return (
      <main className="container mx-auto p-8 text-center min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <p className="text-red-500 font-bold mb-4">Maaf, surat tidak ditemukan.</p>
        <BackButton />
      </main>
    );
  }

  // 🌟 MENGHITUNG RENTANG JUZ UNTUK HEADER 🌟
  const jumlahAyat = surat.jumlahAyat || surat.jml_ayat || surat.ayat?.length || 1;
  const startJuz = getJuzNumber(nomorSurat, 1);
  const endJuz = getJuzNumber(nomorSurat, jumlahAyat);
  const teksJuz = startJuz === endJuz ? `Juz ${startJuz}` : `Juz ${startJuz} - ${endJuz}`;

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mb-6 mt-4">
        <BackButton />
      </div>

      <div className="bg-emerald-600 dark:bg-emerald-800 text-white p-8 rounded-3xl shadow-lg shadow-emerald-200 dark:shadow-none mb-8 text-center relative overflow-hidden transition-colors duration-300">
        <h1 className="text-3xl font-extrabold mb-2">{surat.namaLatin || surat.nama_latin}</h1>

        {/* 👇 INFO JUZ DITAMBAHKAN DI SINI 👇 */}
        <p className="text-emerald-100 dark:text-emerald-200 uppercase tracking-widest text-sm mb-4 leading-relaxed">
          {surat.arti} • {jumlahAyat} Ayat • {surat.tempatTurun || surat.tempat_turun} • {teksJuz}
        </p>

        <div className="text-4xl font-serif font-bold text-emerald-100 dark:text-emerald-200 mb-6" dir="rtl">
          {surat.nama}
        </div>

        <AudioPlayer audioUrls={surat.audioFull || surat.audio || null} namaSurat={surat.namaLatin || surat.nama_latin} />
      </div>

      <div className="w-full">{surat.ayat && <AyatListWrapper ayatList={surat.ayat} nomorSurat={surat.nomor || nomorSurat} namaSurat={surat.namaLatin || surat.nama_latin || 'Surat'} />}</div>
    </main>
  );
}
