// src/components/LastReadCard.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LastReadCard() {
  const [lastRead, setLastRead] = useState<{ nomorSurat: number; namaSurat: string; nomorAyat: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('terakhir_dibaca');
    if (saved) {
      try {
        setLastRead(JSON.parse(saved));
      } catch {}
    }
  }, []);

  if (!lastRead) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
      <div>
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Terakhir Kamu Baca</p>
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
          Surat {lastRead.namaSurat} <span className="text-emerald-600 dark:text-emerald-400 font-medium">(Ayat {lastRead.nomorAyat})</span>
        </h3>
      </div>
      <Link
        href={`/baca/${lastRead.nomorSurat}#ayat-${lastRead.nomorAyat}`}
        className="w-full md:w-auto text-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-md transition-all text-sm cursor-pointer"
      >
        Lanjutkan Membaca →
      </Link>
    </div>
  );
}
