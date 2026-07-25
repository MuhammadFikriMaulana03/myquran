// src/app/fidyah/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BackButton from '../../components/BackButton';

export default function FidyahQadhaPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'qadha' | 'fidyah'>('qadha');

  // State Qadha Puasa
  const [tahunTinggal, setTahunTinggal] = useState<number | ''>('');
  const [jumlahHariQadha, setJumlahHariQadha] = useState<number | ''>('');

  // State Fidyah
  const [jumlahHariFidyah, setJumlahHariFidyah] = useState<number | ''>('');
  const [tarifFidyah, setTarifFidyah] = useState<number | ''>(50000); // Standar asumsi fidyah per hari (Rp)
  const [jenisFidyah, setJenisFidyah] = useState<'uang' | 'beras'>('uang');

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  const totalHariQadha = Number(jumlahHariQadha) || 0;
  const totalHariFidyah = Number(jumlahHariFidyah) || 0;
  const totalTarif = Number(tarifFidyah) || 0;

  // Perhitungan Fidyah Uang & Beras (1 mud setara ± 0.75 kg - 1.5 kg beras per hari)
  const totalUangFidyah = totalHariFidyah * totalTarif;
  const totalBerasFidyah = totalHariFidyah * 1.5; // standar 1.5 kg per hari

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6 mt-4">
        <BackButton />
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Kalkulator Fidyah & Qadha</h1>
        <p className="text-slate-500 dark:text-slate-400">Hitung tanggungan qadha puasa wajib dan pembayaran fidyah dengan mudah</p>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 max-w-md mx-auto gap-1">
        <button
          onClick={() => setActiveTab('qadha')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'qadha' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
          }`}
        >
          🌙 Qadha Puasa
        </button>
        <button
          onClick={() => setActiveTab('fidyah')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'fidyah' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
          }`}
        >
          🌾 Kalkulator Fidyah
        </button>
      </div>

      {/* KONTEN QADHA PUASA */}
      {activeTab === 'qadha' && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 transition-colors">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-1">Hitung Tanggungan Qadha Puasa</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Qadha adalah kewajiban mengganti puasa wajib (Ramadan) yang terlewat karena uzur seperti sakit, haid, atau musafir.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Jumlah Hari Puasa yang Ditinggalkan</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <input
                  type="number"
                  value={jumlahHariQadha}
                  onChange={(e) => setJumlahHariQadha(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 7"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
                <span className="text-slate-400 font-medium ml-2">Hari</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-2xl text-center space-y-3 mt-6">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Hasil Tanggungan</p>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total puasa yang wajib di-qadha (di-ganti):</p>
              <p className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400">
                {totalHariQadha} <span className="text-lg font-normal text-slate-600 dark:text-slate-400">Hari</span>
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-2 border-t border-emerald-200 dark:border-emerald-900/50">
              💡 Tips: Qadha puasa dapat dikerjakan kapan saja di luar bulan Ramadan (terutama di bulan Syawal, Senin-Kamis, atau hari-hari biasa) sebelum datang Ramadan berikutnya.
            </p>
          </div>
        </div>
      )}

      {/* KONTEN KALKULATOR FIDYAH */}
      {activeTab === 'fidyah' && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 transition-colors">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-1">Hitung Pembayaran Fidyah</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Fidyah wajib ditunaikan bagi orang yang tidak mampu berpuasa secara permanen (seperti lansia renta atau sakit menahun) atau ibu hamil/menyusui yang khawatir pada anaknya, serta orang yang melalaikan qadha hingga melewati
              Ramadan berikutnya. Besarannya adalah 1,5 kg makanan pokok per hari atau dibayar dengan uang tunai.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Jumlah Hari Puasa yang Ditinggalkan</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <input
                  type="number"
                  value={jumlahHariFidyah}
                  onChange={(e) => setJumlahHariFidyah(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 30"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
                <span className="text-slate-400 font-medium ml-2">Hari</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Estimasi Tarif Fidyah per Hari (Uang / Rupiah)</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <span className="text-slate-400 font-bold mr-2">Rp</span>
                <input
                  type="number"
                  value={tarifFidyah}
                  onChange={(e) => setTarifFidyah(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 50000"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Standar umum kisaran nilai 1 mud/makan harian (sesuaikan dengan fatwa baznas/daerah setempat).</p>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-2xl text-center space-y-4 mt-6">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Hasil Perhitungan Fidyah</p>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-emerald-200 dark:border-emerald-900/50">
              <div className="bg-white/80 dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Jika Dibayar Beras:</p>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {totalBerasFidyah} <span className="text-xs font-normal text-slate-600 dark:text-slate-400">Kg</span>
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Hari:</p>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {totalHariFidyah} <span className="text-xs font-normal text-slate-600 dark:text-slate-400">Hari</span>
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Fidyah yang harus dibayar dengan Uang:</p>
              <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">{formatRupiah(totalUangFidyah)}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
