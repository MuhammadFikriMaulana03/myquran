// src/components/DaftarSuratList.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Surat {
  nomor: number;
  namaLatin: string;
  nama: string;
  arti: string;
  jumlahAyat: number;
  tempatTurun: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function DaftarSuratList({ daftarSurat }: { daftarSurat: Surat[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Logika pencarian surat
  const filteredSurat = daftarSurat.filter((surat) => {
    const nama = (surat.namaLatin || surat.nama_latin || '').toLowerCase();
    const arti = (surat.arti || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return nama.includes(q) || arti.includes(q) || surat.nomor.toString().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Kolom Pencarian Surat */}
      <div className="relative max-w-xl mx-auto md:mx-0">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">🔍</div>
        <input
          type="text"
          placeholder="Cari surat (misal: Al-Fatihah, Yasin, 36)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer">
            ✕
          </button>
        )}
      </div>

      {/* Grid Daftar Surat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSurat.length > 0 ? (
          filteredSurat.map((surat) => (
            <Link
              key={surat.nomor}
              href={`/baca/${surat.nomor}`}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-300 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-extrabold text-base border border-emerald-200 dark:border-emerald-900 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {surat.nomor}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{surat.namaLatin || surat.nama_latin}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide">
                    {surat.arti} • {surat.jumlahAyat || surat.jml_ayat} Ayat
                  </p>
                </div>
              </div>
              <span className="text-2xl font-serif font-bold text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform" dir="rtl">
                {surat.nama}
              </span>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">🔍 Surat yang kamu cari tidak ditemukan.</div>
        )}
      </div>
    </div>
  );
}
