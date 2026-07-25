// src/app/doa/page.tsx

import Link from 'next/link';

async function getDaftarDoa() {
  try {
    const res = await fetch('https://equran.id/api/doa', {
      cache: 'force-cache',
    });
    const hasil = await res.json();

    if (Array.isArray(hasil)) {
      return hasil;
    } else if (hasil && Array.isArray(hasil.data)) {
      return hasil.data;
    }
    return [];
  } catch (error) {
    console.error('Gagal mengambil data doa:', error);
    return [];
  }
}

export default async function DoaPage() {
  const daftarDoa = await getDaftarDoa();
  const dataAman = Array.isArray(daftarDoa) ? daftarDoa : [];

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-6xl min-h-screen bg-slate-50 text-slate-800">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6 mt-4">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition-all font-medium">
          <span>←</span> Kembali ke Beranda
        </Link>
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-2">Doa-doa Harian</h1>
        <p className="text-slate-500">Pilih dan klik salah satu doa di bawah untuk membacanya</p>
      </div>

      {/* Grid Kumpulan Doa (Sekarang bisa diklik!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataAman.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataAman.map((doa: any, index: number) => {
            const idDoa = index + 1;
            return (
              <Link href={`/doa/${idDoa}`} key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-300 transition-all group cursor-pointer block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold rounded-full border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {idDoa}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{doa.doa || doa.nama}</h3>
                  </div>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500">Maaf, daftar doa sedang tidak dapat dimuat saat ini.</div>
        )}
      </div>
    </main>
  );
}
