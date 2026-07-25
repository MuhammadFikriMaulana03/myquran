// src/app/dzikir/page.tsx
'use client';

import { useState } from 'react';
import { dzikirPagiData, dzikirPetangData } from '../../data/dzikirData';
import BackButton from '../../components/BackButton';

export default function DzikirPage() {
  const [activeTab, setActiveTab] = useState<'pagi' | 'petang'>('pagi');
  const dataAktif = activeTab === 'pagi' ? dzikirPagiData : dzikirPetangData;

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6 mt-4">
        <BackButton />
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Dzikir Pagi & Petang</h1>
        <p className="text-slate-500 dark:text-slate-400">Benteng perlindungan dan ketenangan hati penjemput berkah harian (Al-Matsurat)</p>
      </div>

      {/* Tabs Pagi / Petang */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-10 max-w-md mx-auto gap-1">
        <button
          onClick={() => setActiveTab('pagi')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'pagi' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
          }`}
        >
          ☀️ Dzikir Pagi
        </button>
        <button
          onClick={() => setActiveTab('petang')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'petang' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
          }`}
        >
          🌙 Dzikir Petang
        </button>
      </div>

      {/* Daftar Dzikir */}
      <div className="space-y-6">
        {dataAktif.map((item, index) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
            {/* Info Judul & Target Bacaan */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs">
                {index + 1}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">Dibaca {item.ulangan}x</span>
              </div>
            </div>

            <h3 className="font-bold text-lg text-emerald-800 dark:text-emerald-400 mb-4">{item.judul}</h3>

            {/* Teks Arab */}
            <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-serif leading-[2.5] text-right mb-6" dir="rtl">
              {item.arab}
            </p>

            {/* Latin & Artinya */}
            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
              <p className="text-emerald-700 dark:text-emerald-400 italic text-sm md:text-base font-medium">{item.latin}</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">{item.arti}</p>
            </div>

            {/* Keutamaan */}
            {item.keutamaan && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">🌟 Keutamaan:</p>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.keutamaan}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
