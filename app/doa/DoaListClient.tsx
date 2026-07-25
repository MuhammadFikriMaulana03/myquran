// src/app/doa/DoaListClient.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DoaListClient({ dataAman }: { dataAman: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Logika Pencarian Dinamis
  const filteredDoa = dataAman.filter((doa) => {
    const keyword = searchQuery.toLowerCase();
    const namaDoa = (doa.doa || doa.nama || '').toLowerCase();
    return namaDoa.includes(keyword);
  });

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-6xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6 mt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium"
        >
          <span>←</span> Kembali ke Beranda
        </Link>
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-500 mb-2">Doa-doa Harian</h1>
        <p className="text-slate-500 dark:text-slate-400">Pilih dan klik salah satu doa di bawah untuk membacanya</p>
      </div>

      {/* KOLOM PENCARIAN (SEARCH BAR) */}
      <div className="mb-10 max-w-xl mx-auto relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-slate-400">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Cari doa (misal: tidur, makan)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
            ❌
          </button>
        )}
      </div>

      {/* Grid Kumpulan Doa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoa.length > 0 ? (
          filteredDoa.map((doa: any, index: number) => {
            // Trik Penting: Karena array difilter, index akan berubah.
            // Kita harus mencari index asli di dataAman agar link /doa/id tetap akurat!
            const idDoa = dataAman.findIndex((d) => d === doa) + 1;

            return (
              <Link
                href={`/doa/${idDoa}`}
                key={index}
                className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 transition-all group cursor-pointer block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-bold rounded-full border border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {idDoa}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{doa.doa || doa.nama}</h3>
                  </div>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 text-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-500">
            {dataAman.length === 0 ? 'Maaf, daftar doa sedang tidak dapat dimuat saat ini.' : '🔍 Doa yang kamu cari tidak ditemukan.'}
          </div>
        )}
      </div>
    </main>
  );
}
