// src/components/KalenderControl.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  bulan: number;
  tahun: number;
}

const namaBulanList = [
  { val: 1, label: 'Januari' },
  { val: 2, label: 'Februari' },
  { val: 3, label: 'Maret' },
  { val: 4, label: 'April' },
  { val: 5, label: 'Mei' },
  { val: 6, label: 'Juni' },
  { val: 7, label: 'Juli' },
  { val: 8, label: 'Agustus' },
  { val: 9, label: 'September' },
  { val: 10, label: 'Oktober' },
  { val: 11, label: 'November' },
  { val: 12, label: 'Desember' },
];

export default function KalenderControl({ bulan, tahun }: Props) {
  const router = useRouter();
  const [selectedBulan, setSelectedBulan] = useState(bulan);
  const [selectedTahun, setSelectedTahun] = useState(tahun);

  // Fungsi untuk tombol geser bulan sebelumnya / berikutnya
  const handleGeserBulan = (b: number, t: number) => {
    let targetBulan = b;
    let targetTahun = t;

    if (targetBulan > 12) {
      targetBulan = 1;
      targetTahun += 1;
    } else if (targetBulan < 1) {
      targetBulan = 12;
      targetTahun -= 1;
    }

    router.push(`/kalender?bulan=${targetBulan}&tahun=${targetTahun}`);
  };

  // Fungsi saat form atur bulan/tahun diklik
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/kalender?bulan=${selectedBulan}&tahun=${selectedTahun}`);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Tombol Geser Cepat */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-center">
        <button onClick={() => handleGeserBulan(bulan - 1, tahun)} className="px-4 py-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold rounded-xl border border-slate-200 transition-colors text-sm">
          ← Bulan Lalu
        </button>
        <button onClick={() => handleGeserBulan(bulan + 1, tahun)} className="px-4 py-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold rounded-xl border border-slate-200 transition-colors text-sm">
          Bulan Depan →
        </button>
      </div>

      {/* Form Pilih Bulan & Tahun Spesifik */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto justify-center">
        <select
          value={selectedBulan}
          onChange={(e) => setSelectedBulan(Number(e.target.value))}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 cursor-pointer"
        >
          {namaBulanList.map((m) => (
            <option key={m.val} value={m.val}>
              {m.label}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={selectedTahun}
          onChange={(e) => setSelectedTahun(Number(e.target.value))}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-3 py-2.5 w-24 outline-none focus:border-emerald-500 text-center"
          min="2000"
          max="2100"
        />

        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap">
          Atur
        </button>
      </form>
    </div>
  );
}
