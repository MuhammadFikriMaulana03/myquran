// src/components/WidgetSholat.tsx
'use client';

import { useState, useEffect } from 'react';
import { semuaKota } from '../data/wilayah';
import { useRouter } from 'next/navigation'; // 👈 TAMBAHAN: Import useRouter Next.js

export default function WidgetSholat({ defaultKota }: { defaultKota: string }) {
  const [query, setQuery] = useState(defaultKota);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // 👈 TAMBAHAN: Inisialisasi router

  useEffect(() => {
    const savedKota = localStorage.getItem('user_kota_sholat');
    const urlParams = new URLSearchParams(window.location.search);

    if (!urlParams.has('kota') && savedKota && savedKota !== defaultKota) {
      // 👈 UBAHAN: Ganti window.location.replace dengan router.replace agar tidak hard-reload
      router.replace(`/?kota=${encodeURIComponent(savedKota)}`, { scroll: false });
    }
  }, [defaultKota, router]);

  const filteredKota = query === '' ? semuaKota : semuaKota.filter((kota) => kota.toLowerCase().includes(query.toLowerCase()));

  // 👈 TAMBAHAN: Fungsi khusus untuk menangani klik tombol cari
  const handleCari = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah browser melakukan hard-reload
    localStorage.setItem('user_kota_sholat', query);

    // Perbarui URL dan data tanpa me-refresh halaman & tanpa lompat ke atas!
    router.push(`/?kota=${encodeURIComponent(query)}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <form
      // 👈 UBAHAN: Hapus method="GET" action="/" dan ganti dengan onSubmit kita
      onSubmit={handleCari}
      className="flex flex-col md:flex-row justify-center items-start md:items-center gap-3 mb-8 w-full max-w-lg mx-auto"
    >
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
                  onMouseDown={(e) => {
                    e.preventDefault();
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
