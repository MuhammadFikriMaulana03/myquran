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
    <div id={`ayat-${nomorAyat}`} className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border transition-all relative group scroll-mt-24 ${isTerakhirDibaca ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-100'}`}>
      {/* TOAST NOTIFICATION MELAYANG */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-bounce transition-all">
          <span className="text-xl">✨</span>
          <p className="text-xs md:text-sm font-bold tracking-wide">{toastMessage}</p>
        </div>
      )}

      {/* Nomor Ayat & Tombol Aksi */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold rounded-xl">{nomorAyat}</div>
          {isTerakhirDibaca && <span className="text-xs bg-emerald-600 text-white font-bold px-3 py-1 rounded-full shadow-sm">📌 Posisi Terakhir Dibaca</span>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={tandaiTerakhirDibaca}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isTerakhirDibaca ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
            }`}
          >
            {isTerakhirDibaca ? '📌 Ditandai' : '📌 Tandai Bacaan'}
          </button>

          <button
            onClick={toggleFavorit}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFavorit ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
            }`}
          >
            {isFavorit ? '⭐ Disimpan' : '☆ Simpan'}
          </button>
        </div>
      </div>

      {/* Teks Arab */}
      {arab ? (
        <p className="text-3xl md:text-4xl text-slate-800 font-serif leading-[2.5] text-right mb-6" dir="rtl">
          {arab}
        </p>
      ) : (
        <p className="text-slate-400 italic text-right mb-6">Teks Arab kosong</p>
      )}

      {/* Latin & Artinya */}
      <div className="space-y-3 pt-4 border-t border-slate-50">
        <p className="text-emerald-700 italic font-medium">{latin || 'Cara baca tidak tersedia'}</p>
        <p className="text-slate-600 leading-relaxed">{arti || 'Artinya tidak tersedia'}</p>
      </div>
    </div>
  );
}
