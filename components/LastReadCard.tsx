// src/components/LastReadCard.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LastReadCard() {
  const [isMounted, setIsMounted] = useState(false);
  const [lastRead, setLastRead] = useState<{ nomorSurat: number; namaSurat: string; nomorAyat: number } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('terakhir_dibaca');
      if (saved) {
        setLastRead(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Selama belum mounted (saat proses SSR di server), jangan render apa-apa untuk mencegah hydration mismatch
  if (!isMounted || !lastRead) return null;

  return (
    <div className="bg-white border border-emerald-200 rounded-3xl p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">📖</div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terakhir Kamu Baca</p>
          <h3 className="text-lg font-bold text-slate-800">
            Surat {lastRead.namaSurat} <span className="text-emerald-600 font-semibold">(Ayat {lastRead.nomorAyat})</span>
          </h3>
        </div>
      </div>

      {/* Menambahkan hash #ayat-[nomorAyat] di akhir link */}
      <Link href={`/baca/${lastRead.nomorSurat}#ayat-${lastRead.nomorAyat}`} className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all text-center text-sm">
        Lanjutkan Membaca →
      </Link>
    </div>
  );
}
