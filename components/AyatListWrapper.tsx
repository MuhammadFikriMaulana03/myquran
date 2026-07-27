// src/components/AyatListWrapper.tsx
'use client';

import { useState } from 'react';
import AyatItem from './AyatItem';

interface AyatListWrapperProps {
  ayatList: any[];
  nomorSurat: number;
  namaSurat: string;
}

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
  const [isTajwidActive, setIsTajwidActive] = useState<boolean>(true);
  const [selectedAyat, setSelectedAyat] = useState<any | null>(null);

  const toArabicNumber = (num: number) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
      .toString()
      .split('')
      .map((c) => arabicNumbers[parseInt(c)])
      .join('');
  };

  const renderTajwidText = (text: string) => {
    if (!isTajwidActive || !text) return text;

    const words = text.split(' ');
    return words.map((word, wIdx) => {
      let colorClass = '';

      if (word.includes('ّ')) {
        colorClass = 'text-amber-500 font-bold';
      } else if (['ق', 'ط', 'ب', 'ج', 'د'].some((char) => word.includes(char + 'ْ') || word.includes(char))) {
        colorClass = 'text-blue-500 font-semibold';
      } else if (word.includes('نْ') || word.includes('ً') || word.includes('ٍ') || word.includes('ٌ')) {
        colorClass = 'text-purple-500 font-semibold';
      }

      return (
        <span key={wIdx} className={`${colorClass} transition-colors inline-block mx-[2px]`}>
          {word}
        </span>
      );
    });
  };

  return (
    <div className="w-full relative">
      {/* 🌟 PANEL KONTROL ELEGAN (Desain Minimalis Berkelas ala Aplikasi Pro) 🌟 */}
      <div className="flex items-center justify-between gap-2 mb-4 sticky top-3 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl py-2 px-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm transition-colors">
        {/* Segmented Control Mode Baca */}
        <div className="flex bg-slate-100 dark:bg-slate-950/60 p-1 rounded-xl gap-1">
          <button
            onClick={() => setViewMode('terjemah')}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
              viewMode === 'terjemah' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Terjemah
          </button>
          <button
            onClick={() => setViewMode('mushaf')}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
              viewMode === 'mushaf' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Mushaf
          </button>
        </div>

        {/* Tombol Tajwid Minimalist */}
        <button
          onClick={() => setIsTajwidActive(!isTajwidActive)}
          className={`px-3 py-1.5 rounded-xl font-medium text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
            isTajwidActive
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
              : 'bg-transparent text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isTajwidActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
          <span>Tajwid</span>
        </button>
      </div>

      <div className="animate-in fade-in duration-500">
        {/* MODE 1: TERJEMAHAN */}
        {viewMode === 'terjemah' && (
          <div className="space-y-6">
            {ayatList.map((item: any, index: number) => {
              const rawArab = item.teksArab || item.ar || item.arab || item.text || item.teks || '';
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
                        <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                      </div>
                      <div className="relative flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-6 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-widest uppercase">
                        <span>۞ Permulaan Juz {startJuzData.juz} ۞</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm">{nomorAyat}</div>
                    </div>

                    <div className="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 font-serif leading-[2.8] text-right mb-6 flex flex-wrap justify-end gap-x-2" dir="rtl">
                      {renderTajwidText(rawArab)}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                      <p className="text-emerald-600 dark:text-emerald-400 italic font-medium text-sm">{teksLatin || 'Cara baca tidak tersedia'}</p>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">{teksArti || 'Artinya tidak tersedia'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE 2: MUSHAF */}
        {viewMode === 'mushaf' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="text-right text-[26px] sm:text-[32px] md:text-[40px] leading-[2.6] sm:leading-[3] md:leading-[3.2] font-serif text-slate-800 dark:text-slate-100 flex flex-wrap justify-end gap-x-2" dir="rtl">
              {ayatList.map((item: any, index: number) => {
                const rawArab = item.teksArab || item.ar || item.arab || item.text || item.teks || '';
                const nomorAyat = item.nomorAyat || item.nomor || index + 1;

                const startJuzData = juzStarts.find((j) => j.surat === nomorSurat && j.ayat === nomorAyat);

                return (
                  <span key={nomorAyat} className="inline-flex items-baseline flex-wrap">
                    {startJuzData && (
                      <div className="flex justify-center w-full my-10" dir="ltr">
                        <div className="bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-widest uppercase">
                          <span>۞ Permulaan Juz {startJuzData.juz} ۞</span>
                        </div>
                      </div>
                    )}

                    <span onClick={() => setSelectedAyat(item)} className="cursor-pointer hover:opacity-85 transition-opacity rounded px-1 inline-flex items-baseline flex-wrap gap-x-1" title="Ketuk untuk melihat terjemahan">
                      {renderTajwidText(rawArab)}

                      <span className="inline-flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-sans mx-1.5 md:mx-2 text-xl md:text-2xl select-none align-middle">
                        <span className="font-bold opacity-80">﴿</span>
                        <span className="px-0.5 md:px-1 text-lg md:text-xl">{toArabicNumber(nomorAyat)}</span>
                        <span className="font-bold opacity-80">﴾</span>
                      </span>
                    </span>
                  </span>
                );
              })}
            </div>

            <p className="text-center text-slate-400 text-xs mt-12 font-medium tracking-widest uppercase">Akhir dari Surat {namaSurat} • Ketuk ayat mana saja untuk melihat arti.</p>
          </div>
        )}
      </div>

      {/* POPUP MODAL TERJEMAHAN DINAMIS */}
      {selectedAyat && (
        <div onClick={() => setSelectedAyat(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-300 text-left max-h-[85vh] flex flex-col"
          >
            <button
              onClick={() => setSelectedAyat(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer z-10 shadow-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4 pr-10">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-3 py-1 rounded-xl text-xs">Ayat {selectedAyat.nomorAyat || selectedAyat.nomor}</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{namaSurat}</span>
            </div>

            <div className="overflow-y-auto pr-2 space-y-4">
              <div className="text-2xl sm:text-3xl font-serif text-right text-slate-800 dark:text-slate-100 leading-[2.4] flex flex-wrap justify-end gap-x-2" dir="rtl">
                {renderTajwidText(selectedAyat.teksArab || selectedAyat.ar || selectedAyat.arab || selectedAyat.text || selectedAyat.teks)}
              </div>

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
