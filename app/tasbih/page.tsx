// src/app/tasbih/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

const pilihanDzikir = [
  { nama: 'Subhanallah', target: 33, arti: 'Maha Suci Allah' },
  { nama: 'Alhamdulillah', target: 33, arti: 'Segala Pujian Bagi Allah' },
  { nama: 'Allahu Akbar', target: 33, arti: 'Allah Maha Besar' },
  { nama: "Astaghfirullahal 'Azhim", target: 100, arti: 'Aku memohon ampun kepada Allah Yang Agung' },
  { nama: 'La ilaha illallah', target: 100, arti: 'Tiada Tuhan selain Allah' },
  { nama: 'Dzikir Bebas', target: 1000, arti: 'Bebas berdzikir seikhlasnya' },
];

export default function TasbihPage() {
  const [activeDzikir, setActiveDzikir] = useState(pilihanDzikir[0]);
  const [count, setCount] = useState(0);

  // Ambil total dzikir langsung dari localStorage saat komponen dimuat
  const [totalAll, setTotalAll] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const savedTotal = localStorage.getItem('total_dzikir');
    return savedTotal ? Number(savedTotal) : 0;
  });

  const handleHitung = () => {
    const newCount = count + 1;
    const newTotal = totalAll + 1;
    setCount(newCount);
    setTotalAll(newTotal);
    localStorage.setItem('total_dzikir', newTotal.toString());
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-2xl min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      <div>
        {/* Tombol Navigasi Kembali */}
        <div className="mb-6 mt-4">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition-all font-medium">
            <span>←</span> Kembali ke Beranda
          </Link>
        </div>

        {/* Header Halaman */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-emerald-700 mb-2">Tasbih Digital</h1>
          <p className="text-slate-500">Hitung bacaan dzikir dan tasbih harianmu dengan mudah</p>
        </div>

        {/* Pilihan Jenis Dzikir */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Pilih Bacaan Dzikir</label>
          <select
            value={activeDzikir.nama}
            onChange={(e) => {
              const selected = pilihanDzikir.find((d) => d.nama === e.target.value);
              if (selected) {
                setActiveDzikir(selected);
                setCount(0);
              }
            }}
            className="w-full bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl p-4 shadow-sm outline-none cursor-pointer text-center"
          >
            {pilihanDzikir.map((d) => (
              <option key={d.nama} value={d.nama}>
                {d.nama} (Target: {d.target}x)
              </option>
            ))}
          </select>
        </div>

        {/* Kotak Utama Tasbih (Counter Display) */}
        <div className="bg-emerald-600 text-white rounded-3xl p-8 shadow-xl shadow-emerald-200 text-center relative overflow-hidden mb-6">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500 rounded-full opacity-50 blur-2xl"></div>

          <div className="relative z-10">
            <p className="text-emerald-100 font-medium text-sm mb-1">{activeDzikir.arti}</p>
            <h2 className="text-2xl font-bold mb-6">{activeDzikir.nama}</h2>

            {/* Angka Counter */}
            <div className="bg-emerald-700/60 backdrop-blur-md border border-emerald-500/40 rounded-2xl py-8 mb-6 shadow-inner">
              <span className="text-7xl md:text-8xl font-extrabold font-mono tracking-wider">{count}</span>
              <p className="text-xs text-emerald-200 mt-2 font-medium">Target: {activeDzikir.target} kali</p>
            </div>

            {/* Tombol Utama Hitung (Tap / Click) */}
            <div className="flex gap-4 justify-center">
              <button onClick={handleHitung} className="flex-1 bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-xl py-6 rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer">
                TAP / HITUNG 📿
              </button>
              <button onClick={handleReset} className="bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 font-bold px-6 py-6 rounded-2xl border border-emerald-500/30 transition-all cursor-pointer text-sm" title="Reset Hitungan">
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Statistik Kecil */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs text-slate-400 font-medium mb-1">Total Keseluruhan Dzikir Tersimpan</p>
          <p className="text-xl font-extrabold text-emerald-700">
            {totalAll} <span className="text-xs font-normal text-slate-500">kali bacaan</span>
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 py-6">MyQuran App • Tasbih Digital Interaktif</div>
    </main>
  );
}
