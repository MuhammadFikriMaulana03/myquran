// src/app/asmaulhusna/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { dataAsmaulHusna } from '../../data/asmaulHusna';

export default function AsmaulHusnaPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data berdasarkan input pencarian (bisa berdasarkan latin, arti, nomor urut, atau teks arab)
  const filteredData = dataAsmaulHusna.filter((item) => {
    const query = searchQuery.toLowerCase();
    return item.latin.toLowerCase().includes(query) || item.arti.toLowerCase().includes(query) || item.urutan.toString().includes(query) || item.arab.includes(query);
  });

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-6xl min-h-screen bg-slate-50 text-slate-800">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6 mt-4">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition-all font-medium">
          <span>←</span> Kembali ke Beranda
        </Link>
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-2">Asmaul Husna</h1>
        <p className="text-slate-500">99 Nama Allah SWT yang Agung beserta artinya</p>
      </div>

      {/* Kotak Pencarian (Search Bar) */}
      <div className="max-w-md mx-auto mb-10 relative">
        <div className="flex items-center w-full bg-white p-2 rounded-2xl shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
          <span className="pl-3 pr-2 text-slate-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama (misal: Ar-Rahman, Pengasih, 1)..."
            className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 text-sm md:text-base outline-none px-2 py-2 w-full"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="px-3 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid 99 Asmaul Husna */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.urutan} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between text-center group">
              {/* Nomor Urut */}
              <div className="flex justify-between items-center mb-4">
                <span className="w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full">{item.urutan}</span>
                <span className="text-xs text-slate-400 font-medium">Asmaul Husna</span>
              </div>

              {/* Teks Arab */}
              <div className="my-3">
                <h3 className="text-3xl font-serif text-emerald-800 group-hover:scale-105 transition-transform">{item.arab}</h3>
              </div>

              {/* Latin & Arti */}
              <div className="pt-4 border-t border-slate-50 mt-2">
                <p className="font-bold text-slate-700 text-base mb-1">{item.latin}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.arti}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500">
            <p className="text-lg font-semibold mb-1">Nama tidak ditemukan</p>
            <p className="text-sm">Coba cari dengan kata kunci lain (contoh: &apos;Rahman&apos; atau &apos;Penyayang&apos;).</p>
          </div>
        )}
      </div>
    </main>
  );
}
