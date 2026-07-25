// src/components/WidgetSholat.tsx
'use client';

import { useState } from 'react';
import { semuaKota } from '../data/wilayah';

export default function WidgetSholat({ defaultKota }: { defaultKota: string }) {
  const [query, setQuery] = useState(defaultKota);
  const [isOpen, setIsOpen] = useState(false);

  const filteredKota = query === '' ? semuaKota : semuaKota.filter((kota) => kota.toLowerCase().includes(query.toLowerCase()));

  return (
    <form method="GET" action="/" className="flex flex-col md:flex-row justify-center items-start md:items-center gap-3 mb-8 w-full max-w-lg mx-auto">
      <div className="relative w-full">
        <div className="flex items-center w-full bg-emerald-700/60 p-1.5 rounded-xl backdrop-blur-sm border border-emerald-500/30 shadow-inner focus-within:ring-2 focus-within:ring-emerald-400 transition-all z-20">
          <div className="pl-3 pr-2 text-emerald-300">🔍</div>

          <input
            type="text"
            name="kota"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            // Waktu tunggu blur bisa kita hapus atau kecilkan karena kita pakai trik onMouseDown
            onBlur={() => setIsOpen(false)}
            placeholder="Ketik nama kota (misal: Kuningan)..."
            className="flex-1 bg-transparent text-white placeholder-emerald-300/70 text-sm md:text-base outline-none px-2 py-2 w-full"
            autoComplete="off"
            required
          />
        </div>

        {isOpen && (
          <ul className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl max-h-60 overflow-y-auto border border-slate-100 text-left">
            {filteredKota.length > 0 ? (
              filteredKota.map((kota, idx) => (
                <li
                  key={idx}
                  // Trik Rahasia: Gunakan onMouseDown dan preventDefault!
                  onMouseDown={(e) => {
                    e.preventDefault(); // Mencegah input kehilangan fokus
                    setQuery(kota);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer border-b border-slate-50 last:border-0 transition-colors"
                >
                  {kota}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-slate-400 italic text-center">Kota tidak ditemukan...</li>
            )}
          </ul>
        )}
      </div>

      <button type="submit" className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-6 py-3 md:py-3.5 rounded-xl transition-colors shadow-sm whitespace-nowrap mt-2 md:mt-0">
        Cari
      </button>
    </form>
  );
}
