// src/app/baca/[nomor]/page.tsx

import { EQuran } from 'equran';
import Link from 'next/link';
import AyatItem from '../../../components/AyatItem';
import AudioPlayer from '../../../components/AudioPlayer';

interface PageProps {
  params: Promise<{ nomor: string }>;
}

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
      <main className="container mx-auto p-8 text-center min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-red-500 font-bold mb-4">Maaf, surat tidak ditemukan.</p>
        <Link href="/" className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow">
          Kembali ke Beranda
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-slate-50 text-slate-800">
      {/* Tombol Kembali */}
      <div className="mb-6 mt-4">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition-all font-medium">
          <span>←</span> Kembali ke Beranda
        </Link>
      </div>

      {/* Header Surat dengan Pemutar Audio Murottal */}
      <div className="bg-emerald-600 text-white p-8 rounded-3xl shadow-lg shadow-emerald-200 mb-8 text-center relative overflow-hidden">
        <h1 className="text-3xl font-extrabold mb-2">{surat.namaLatin || surat.nama_latin}</h1>
        <p className="text-emerald-100 uppercase tracking-widest text-sm mb-4">
          {surat.arti} • {surat.jumlahAyat || surat.jml_ayat} Ayat • {surat.tempatTurun || surat.tempat_turun}
        </p>
        <div className="text-4xl font-serif font-bold text-emerald-100 mb-6" dir="rtl">
          {surat.nama}
        </div>

        {/* PEMUTAR AUDIO MUROTTAL MELAYANG */}
        <AudioPlayer audioUrls={surat.audioFull || surat.audio || null} namaSurat={surat.namaLatin || surat.nama_latin} />
      </div>

      {/* List Ayat */}
      <div className="space-y-6">
        {surat.ayat &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          surat.ayat.map((item: any, index: number) => {
            const teksArab = item.teksArab || item.ar || item.arab || item.text || item.teks || '';
            const teksLatin = item.teksLatin || item.tr || item.latin || item.transliteration || '';
            const teksArti = item.teksIndonesia || item.idn || item.arti || item.terjemahan || '';
            const nomorAyat = item.nomorAyat || item.nomor || index + 1;

            return <AyatItem key={nomorAyat} nomorSurat={surat.nomor || nomorSurat} namaSurat={surat.namaLatin || surat.nama_latin || 'Surat'} nomorAyat={nomorAyat} arab={teksArab} latin={teksLatin} arti={teksArti} />;
          })}
      </div>
    </main>
  );
}
