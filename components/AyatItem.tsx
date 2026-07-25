// src/components/AyatItem.tsx
'use client';

import { useState } from 'react';

interface Props {
  nomorSurat: number;
  namaSurat: string;
  nomorAyat: number;
  arab: string;
  latin: string;
  arti: string;
}

export default function AyatItem({ nomorSurat, namaSurat, nomorAyat, arab, latin, arti }: Props) {
  // Inisialisasi status favorit langsung dari localStorage secara aman
  const [isFavorit, setIsFavorit] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const savedFav = localStorage.getItem('ayat_favorit');
      if (savedFav) {
        const parsed = JSON.parse(savedFav);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return parsed.some((item: any) => item.nomorSurat === nomorSurat && item.nomorAyat === nomorAyat);
      }
    } catch {}
    return false;
  });

  // Inisialisasi status terakhir dibaca langsung dari localStorage secara aman
  const [isTerakhirDibaca, setIsTerakhirDibaca] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const lastRead = localStorage.getItem('terakhir_dibaca');
      if (lastRead) {
        const parsedLast = JSON.parse(lastRead);
        return parsedLast.nomorSurat === nomorSurat && parsedLast.nomorAyat === nomorAyat;
      }
    } catch {}
    return false;
  });

  // State untuk Toast Notification
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const toggleFavorit = () => {
    const saved = localStorage.getItem('ayat_favorit');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsed: any[] = [];
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {}
    }

    if (isFavorit) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parsed = parsed.filter((item: any) => !(item.nomorSurat === nomorSurat && item.nomorAyat === nomorAyat));
      setIsFavorit(false);
      triggerToast('Berhasil dihapus dari Ayat Favorit 🗑️');
    } else {
      parsed.push({ nomorSurat, namaSurat, nomorAyat, arab, latin, arti });
      setIsFavorit(true);
      triggerToast('Berhasil disimpan ke Ayat Favorit ⭐');
    }

    localStorage.setItem('ayat_favorit', JSON.stringify(parsed));
  };

  const tandaiTerakhirDibaca = () => {
    const data = { nomorSurat, namaSurat, nomorAyat };
    localStorage.setItem('terakhir_dibaca', JSON.stringify(data));
    setIsTerakhirDibaca(true);
    triggerToast(`📌 Posisi disimpan: Surat ${namaSurat} Ayat ${nomorAyat}`);
  };

  return (
    <div
      id={`ayat-${nomorAyat}`}
      className={`bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border transition-colors duration-300 relative group scroll-mt-24 ${
        isTerakhirDibaca ? 'border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-900/50' : 'border-slate-100 dark:border-slate-800'
      }`}
    >
      {/* TOAST NOTIFICATION MELAYANG */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 dark:bg-emerald-950 text-white px-6 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-bounce transition-all">
          <span className="text-xl">✨</span>
          <p className="text-xs md:text-sm font-bold tracking-wide">{toastMessage}</p>
        </div>
      )}

      {/* Nomor Ayat & Tombol Aksi */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold rounded-xl border border-transparent dark:border-emerald-800/50">{nomorAyat}</div>
          {isTerakhirDibaca && <span className="text-xs bg-emerald-600 text-white font-bold px-3 py-1 rounded-full shadow-sm">📌 Posisi Terakhir Dibaca</span>}
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol Tandai Dibaca */}
          <button
            onClick={tandaiTerakhirDibaca}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isTerakhirDibaca
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isTerakhirDibaca ? '📌 Ditandai' : '📌 Tandai Bacaan'}
          </button>

          {/* Tombol Simpan Favorit */}
          <button
            onClick={toggleFavorit}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFavorit
                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isFavorit ? '⭐ Disimpan' : '☆ Simpan'}
          </button>
        </div>
      </div>

      {/* Teks Arab */}
      {arab ? (
        <p className="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 font-serif leading-[2.5] text-right mb-6 transition-colors" dir="rtl">
          {arab}
        </p>
      ) : (
        <p className="text-slate-400 dark:text-slate-600 italic text-right mb-6">Teks Arab kosong</p>
      )}

      {/* Latin & Artinya */}
      <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
        <p className="text-emerald-700 dark:text-emerald-400 italic font-medium transition-colors">{latin || 'Cara baca tidak tersedia'}</p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">{arti || 'Artinya tidak tersedia'}</p>
      </div>
    </div>
  );
}
