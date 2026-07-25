// src/app/solat-sunnah/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { dataSolatSunnah, SolatSunnahItem } from '../../data/solatSunnah';
import BackButton from '../../components/BackButton';

export default function SolatSunnahPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<number | null>(null); // Untuk accordion detail

  const filteredData = dataSolatSunnah.filter((item) => {
    const q = searchQuery.toLowerCase();
    return item.nama.toLowerCase().includes(q) || item.keutamaan.toLowerCase().includes(q);
  });

  const toggleAccordion = (id: number) => {
    setActiveTab(activeTab === id ? null : id);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Kembali */}
      <div className="mb-6 mt-4">
        <BackButton />
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Panduan Sholat Sunnah</h1>
        <p className="text-slate-500 dark:text-slate-400">Tata cara, niat, waktu, dan keutamaan berbagai macam sholat sunnah</p>
      </div>

      {/* Kolom Pencarian */}
      <div className="max-w-md mx-auto mb-10">
        <div className="flex items-center w-full bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
          <span className="pl-3 pr-2 text-slate-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari sholat sunnah (misal: Dhuha, Tahajud)..."
            className="flex-1 bg-transparent text-slate-700 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none px-2 py-2 w-full"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* List Kartu Sholat Sunnah */}
      <div className="space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            const isOpen = activeTab === item.id;

            return (
              <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
                {/* Header Kartu (Bisa diklik untuk buka/tutup) */}
                <div onClick={() => toggleAccordion(item.id)} className="p-6 md:p-8 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">{item.rakaat}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">{item.nama}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">🕒 {item.waktu}</p>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold transition-transform duration-300 ${isOpen ? 'rotate-180 bg-emerald-600 text-white dark:bg-emerald-600' : ''}`}
                  >
                    ↓
                  </div>
                </div>

                {/* Konten Detail (Accordion) */}
                {isOpen && (
                  <div className="px-6 pb-8 md:px-8 space-y-6 border-t border-slate-100 dark:border-slate-800 pt-6 animate-fadeIn">
                    {/* Keutamaan */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                      <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">🌟 Keutamaan:</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.keutamaan}</p>
                    </div>

                    {/* Niat */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Niat Sholat:</h4>
                      <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-serif leading-[2.5] text-right" dir="rtl">
                        {item.niat.arab}
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-400 italic text-sm font-medium">{item.niat.latin}</p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.niat.arti}</p>
                    </div>

                    {/* Tata Cara */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tata Cara Pelaksanaan:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.tataCara.map((langkah, index) => (
                          <li key={index} className="pl-1">
                            <span className="font-medium text-slate-800 dark:text-slate-200">{langkah}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <p className="text-lg font-semibold mb-1">Sholat sunnah tidak ditemukan</p>
            <p className="text-sm">Coba cari dengan kata kunci lain.</p>
          </div>
        )}
      </div>
    </main>
  );
}
