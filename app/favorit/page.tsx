// src/app/favorit/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface AyatFavorit {
  nomorSurat: number;
  namaSurat: string;
  nomorAyat: number;
  arab: string;
  latin: string;
  arti: string;
}

export default function FavoritPage() {
  // Mengambil data awal langsung dari localStorage secara aman untuk Next.js (SSR compatible)
  const [daftarFavorit, setDaftarFavorit] = useState<AyatFavorit[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('ayat_favorit');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const hapusFavorit = (nomorSurat: number, nomorAyat: number) => {
    const updated = daftarFavorit.filter((item) => !(item.nomorSurat === nomorSurat && item.nomorAyat === nomorAyat));
    setDaftarFavorit(updated);
    localStorage.setItem('ayat_favorit', JSON.stringify(updated));
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-slate-50 text-slate-800">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6 mt-4">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition-all font-medium">
          <span>←</span> Kembali ke Beranda
        </Link>
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-2">Ayat Favorit</h1>
        <p className="text-slate-500">Daftar ayat Al-Quran pilihan yang telah kamu simpan</p>
      </div>

      {/* Daftar Ayat Tersimpan */}
      <div className="space-y-4">
        {daftarFavorit.length > 0 ? (
          daftarFavorit.map((item, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative group">
              {/* Info Surat & Tombol Hapus */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Surat {item.namaSurat} (Ayat {item.nomorAyat})
                </span>

                <div className="flex items-center gap-3">
                  <Link href={`/baca/${item.nomorSurat}#ayat-${item.nomorAyat}`} className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors">
                    Buka Surat →
                  </Link>
                  <button onClick={() => hapusFavorit(item.nomorSurat, item.nomorAyat)} className="text-red-400 hover:text-red-600 text-sm font-bold p-1 cursor-pointer" title="Hapus dari favorit">
                    🗑️
                  </button>
                </div>
              </div>

              {/* Teks Arab */}
              <p className="text-2xl md:text-3xl text-slate-800 font-serif leading-[2.5] text-right mb-4" dir="rtl">
                {item.arab}
              </p>

              {/* Latin & Arti */}
              <div className="space-y-2 pt-3 border-t border-slate-50">
                <p className="text-emerald-700 italic text-sm font-medium">{item.latin}</p>
                <p className="text-slate-600 leading-relaxed">{item.arti}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-slate-100 text-slate-500">
            <p className="text-lg font-semibold mb-1">Belum ada ayat favorit</p>
            <p className="text-sm text-slate-400">Kamu bisa menyimpan ayat dengan mengeklik ikon bintang (⭐) pada halaman baca surat.</p>
          </div>
        )}
      </div>
    </main>
  );
}
