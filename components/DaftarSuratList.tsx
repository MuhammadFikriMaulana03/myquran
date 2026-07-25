// src/components/DaftarSuratList.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Surat } from 'equran';

interface Props {
  daftarSurat: Surat[];
}

export default function DaftarSuratList({ daftarSurat }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter daftar surat berdasarkan nama latin, arti, nomor, atau teks arab
  const filteredSurat = daftarSurat.filter((surat) => {
    const query = searchQuery.toLowerCase();
    return surat.namaLatin.toLowerCase().includes(query) || surat.arti.toLowerCase().includes(query) || surat.nomor.toString().includes(query) || surat.nama.includes(query);
  });

  return (
    <div>
      {/* Kotak Pencarian Surat */}
      <div className="max-w-md mx-auto mb-10 relative z-10">
        <div className="flex items-center w-full bg-white p-2 rounded-2xl shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
          <span className="pl-3 pr-2 text-slate-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari surat (misal: Al-Fatihah, Yasin, 36)..."
            className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 text-sm md:text-base outline-none px-2 py-2 w-full"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="px-3 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid Daftar Surat */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredSurat.length > 0 ? (
          filteredSurat.map((surat) => (
            <Link href={`/baca/${surat.nomor}`} key={surat.nomor}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-300 transition-all group cursor-pointer flex justify-between items-center h-full">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-700 font-bold rounded-xl group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">{surat.nomor}</div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{surat.namaLatin}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                      {surat.arti} • {surat.jumlahAyat} Ayat
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-emerald-600 font-serif" dir="rtl">
                    {surat.nama}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500">
            <p className="text-lg font-semibold mb-1">Surat tidak ditemukan</p>
            <p className="text-sm">Coba cari dengan nama latin, arti, atau nomor surat.</p>
          </div>
        )}
      </div>
    </div>
  );
}
