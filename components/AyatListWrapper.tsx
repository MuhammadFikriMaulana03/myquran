// src/components/AyatListWrapper.tsx
'use client';

import { useState } from 'react';
import AyatItem from './AyatItem';

interface AyatListWrapperProps {
  ayatList: any[];
  nomorSurat: number;
  namaSurat: string;
}

// 🌟 DATABASE MINI (Titik Mulai 30 Juz) 🌟
const juzStarts = [
  { juz: 1, surat: 1, ayat: 1 },
  { juz: 2, surat: 2, ayat: 142 },
  { juz: 3, surat: 2, ayat: 253 },
  { juz: 4, surat: 3, ayat: 93 },
  { juz: 5, surat: 4, ayat: 24 },
  { juz: 6, surat: 4, ayat: 148 },
  { juz: 7, surat: 5, ayat: 82 },
  { juz: 8, surat: 6, ayat: 111 },
  { juz: 9, surat: 7, ayat: 88 },
  { juz: 10, surat: 8, ayat: 41 },
  { juz: 11, surat: 9, ayat: 93 },
  { juz: 12, surat: 11, ayat: 6 },
  { juz: 13, surat: 12, ayat: 53 },
  { juz: 14, surat: 15, ayat: 1 },
  { juz: 15, surat: 17, ayat: 1 },
  { juz: 16, surat: 18, ayat: 75 },
  { juz: 17, surat: 21, ayat: 1 },
  { juz: 18, surat: 23, ayat: 1 },
  { juz: 19, surat: 25, ayat: 21 },
  { juz: 20, surat: 27, ayat: 56 },
  { juz: 21, surat: 29, ayat: 46 },
  { juz: 22, surat: 33, ayat: 31 },
  { juz: 23, surat: 36, ayat: 28 },
  { juz: 24, surat: 39, ayat: 32 },
  { juz: 25, surat: 41, ayat: 47 },
  { juz: 26, surat: 46, ayat: 1 },
  { juz: 27, surat: 51, ayat: 31 },
  { juz: 28, surat: 58, ayat: 1 },
  { juz: 29, surat: 67, ayat: 1 },
  { juz: 30, surat: 78, ayat: 1 },
];

export default function AyatListWrapper({ ayatList, nomorSurat, namaSurat }: AyatListWrapperProps) {
  const [viewMode, setViewMode] = useState<'terjemah' | 'mushaf'>('terjemah');
  const [selectedAyat, setSelectedAyat] = useState<any | null>(null);

  const toArabicNumber = (num: number) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
      .toString()
      .split('')
      .map((c) => arabicNumbers[parseInt(c)])
      .join('');
  };

  return (
    <div className="w-full relative">
      {/* 🌟 TOGGLE MODE BACA 🌟 */}
      <div className="flex justify-center mb-8 sticky top-4 z-30">
        <div className="flex bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 gap-1 transition-colors duration-300">
          <button
            onClick={() => setViewMode('terjemah')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
              viewMode === 'terjemah' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📑 Dengan Terjemah
          </button>
          <button
            onClick={() => setViewMode('mushaf')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
              viewMode === 'mushaf' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📖 Mode Mushaf
          </button>
        </div>
      </div>

      <div className="animate-in fade-in duration-500">
        {/* ========================================= */}
        {/* MODE 1: TERJEMAHAN */}
        {/* ========================================= */}
        {viewMode === 'terjemah' && (
          <div className="space-y-6">
            {ayatList.map((item: any, index: number) => {
              const teksArab = item.teksArab || item.ar || item.arab || item.text || item.teks || '';
              const teksLatin = item.teksLatin || item.tr || item.latin || item.transliteration || '';
              const teksArti = item.teksIndonesia || item.idn || item.arti || item.terjemahan || '';
              const nomorAyat = item.nomorAyat || item.nomor || index + 1;
              const audioAyat = item.audio || item.audioFull || item.audio_url || null;

              const startJuzData = juzStarts.find((j) => j.surat === nomorSurat && j.ayat === nomorAyat);

              return (
                <div key={nomorAyat}>
                  {startJuzData && (
                    <div className="relative flex items-center justify-center my-14 group">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t-2 border-emerald-200 dark:border-emerald-800/60 transition-colors"></div>
                      </div>

                      <div className="relative flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-800 dark:to-emerald-950 px-8 py-3.5 rounded-full shadow-lg shadow-emerald-600/30 border-[3px] border-white dark:border-slate-900 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-amber-400 text-lg mr-3 drop-shadow-md">۞</span>
                        <span className="text-white font-black tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Permulaan Juz {startJuzData.juz}</span>
                        <span className="text-amber-400 text-lg ml-3 drop-shadow-md">۞</span>
                        <div className="absolute -inset-1 bg-emerald-400/20 blur-lg rounded-full -z-10"></div>
                      </div>
                    </div>
                  )}

                  <AyatItem nomorSurat={nomorSurat} namaSurat={namaSurat} nomorAyat={nomorAyat} arab={teksArab} latin={teksLatin} arti={teksArti} audioUrl={audioAyat} />
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================= */}
        {/* MODE 2: MUSHAF */}
        {/* ========================================= */}
        {viewMode === 'mushaf' && (
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="text-right text-[26px] sm:text-[32px] md:text-[40px] leading-[2.4] sm:leading-[2.8] md:leading-[3] font-serif text-slate-800 dark:text-slate-100" dir="rtl">
              {ayatList.map((item: any, index: number) => {
                const teksArab = item.teksArab || item.ar || item.arab || item.text || item.teks || '';
                const nomorAyat = item.nomorAyat || item.nomor || index + 1;

                const startJuzData = juzStarts.find((j) => j.surat === nomorSurat && j.ayat === nomorAyat);

                return (
                  <span key={nomorAyat}>
                    {startJuzData && (
                      <div className="flex justify-center w-full my-8 md:my-12" dir="ltr">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg shadow-amber-500/30 border-4 border-white dark:border-slate-900 flex items-center justify-center font-sans">
                          <span className="text-white text-lg md:text-xl mr-2 md:mr-3 opacity-90">۞</span>
                          <span className="text-white font-black tracking-[0.2em] uppercase text-[10px] md:text-xs drop-shadow-sm">Permulaan Juz {startJuzData.juz}</span>
                          <span className="text-white text-lg md:text-xl ml-2 md:ml-3 opacity-90">۞</span>
                        </div>
                      </div>
                    )}

                    <span onClick={() => setSelectedAyat(item)} className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded px-1 group relative" title="Ketuk untuk melihat terjemahan">
                      {teksArab}

                      <span className="inline-flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-sans mx-1.5 md:mx-2 text-xl md:text-2xl select-none">
                        <span className="font-bold opacity-80">﴿</span>
                        <span className="px-0.5 md:px-1 text-lg md:text-xl">{toArabicNumber(nomorAyat)}</span>
                        <span className="font-bold opacity-80">﴾</span>
                      </span>
                    </span>
                  </span>
                );
              })}
            </div>

            <p className="text-center text-slate-400 text-[10px] md:text-xs mt-10 md:mt-12 font-medium tracking-widest uppercase">Akhir dari Surat {namaSurat} • Ketuk ayat mana saja untuk melihat arti.</p>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* POPUP MODAL DINAMIS (Aman untuk Ayat Panjang) */}
      {/* ========================================= */}
      {selectedAyat && (
        <div onClick={() => setSelectedAyat(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-300 text-left max-h-[85vh] flex flex-col"
          >
            {/* Tombol Close (Sticky di atas, tidak akan ikut tergeser) */}
            <button
              onClick={() => setSelectedAyat(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer z-10 shadow-sm"
            >
              ✕
            </button>

            {/* Header Info */}
            <div className="flex items-center gap-2 mb-4 pr-10">
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold px-3 py-1 rounded-xl text-xs border border-emerald-200 dark:border-emerald-800/50">
                Ayat {selectedAyat.nomorAyat || selectedAyat.nomor}
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{namaSurat}</span>
            </div>

            {/* 🌟 KOTAK KONTEN YANG BISA DI-SCROLL SENDIRI JIKA PANJANG 🌟 */}
            <div className="overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {/* Teks Arab */}
              <p className="text-2xl sm:text-3xl font-serif text-right text-slate-800 dark:text-slate-100 leading-[2.2]" dir="rtl">
                {selectedAyat.teksArab || selectedAyat.ar || selectedAyat.arab || selectedAyat.text || selectedAyat.teks}
              </p>

              {/* Terjemahan & Latin */}
              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 italic font-medium leading-relaxed">{selectedAyat.teksLatin || selectedAyat.tr || selectedAyat.latin || selectedAyat.transliteration}</p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{selectedAyat.teksIndonesia || selectedAyat.idn || selectedAyat.arti || selectedAyat.terjemahan}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
