// src/app/doa/[id]/page.tsx

import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getDetailDoa(id: string) {
  try {
    const res = await fetch('https://equran.id/api/doa', {
      cache: 'force-cache',
    });
    const hasil = await res.json();
    const data = Array.isArray(hasil) ? hasil : hasil?.data || [];
    const index = Number(id) - 1;
    return data[index] || null;
  } catch (error) {
    return null;
  }
}

export default async function DetailDoaPage(props: PageProps) {
  const params = await props.params;
  const doa = await getDetailDoa(params.id);

  if (!doa) {
    return (
      <main className="container mx-auto p-8 text-center min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <p className="text-red-500 font-bold mb-4">Maaf, doa tidak ditemukan.</p>
        <Link href="/doa" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition">
          Kembali ke Daftar Doa
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Kembali */}
      <div className="mb-6 mt-4">
        <Link
          href="/doa"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium"
        >
          <span>←</span> Kembali ke Daftar Doa
        </Link>
      </div>

      {/* Kartu Detail Doa */}
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-bold rounded-2xl border border-emerald-200 dark:border-emerald-800 text-lg">
            {params.id}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">{doa.nama}</h1>
            {doa.grup && <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider mt-1">{doa.grup}</p>}
          </div>
        </div>

        {/* Teks Arab (ar) */}
        <p className="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 font-serif leading-[2.5] text-right mb-8" dir="rtl">
          {doa.ar}
        </p>

        {/* Latin & Artinya (tr & idn) */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Cara Baca (Latin):</h4>
            <p className="text-emerald-700 dark:text-emerald-400 italic font-medium">{doa.tr}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Artinya:</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{doa.idn}</p>
          </div>

          {/* Keterangan / Riwayat (tentang) jika ada */}
          {doa.tentang && (
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-sm text-emerald-900 dark:text-emerald-300 leading-relaxed">
              <span className="font-bold block mb-1">📖 Riwayat / Keterangan:</span>
              {doa.tentang}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
