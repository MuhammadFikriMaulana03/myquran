// src/app/zakat/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ZakatPage() {
  const router = useRouter();
  const [jenisZakat, setJenisZakat] = useState<'penghasilan' | 'maal' | 'fitrah'>('penghasilan');

  // State Zakat Penghasilan
  const [penghasilanBulanan, setPenghasilanBulanan] = useState<number | ''>('');
  const [penghasilanLain, setPenghasilanLain] = useState<number | ''>('');

  // State Zakat Maal (Harta / Tabungan)
  const [totalTabungan, setTotalTabungan] = useState<number | ''>('');
  const [hartaLain, setHartaLain] = useState<number | ''>('');
  const [hutang, setHutang] = useState<number | ''>('');

  // State Zakat Fitrah
  const [jumlahJiwa, setJumlahJiwa] = useState<number | ''>(1);
  const [hargaBerasPerKg, setHargaBerasPerKg] = useState<number | ''>(15000); // Standar asumsi harga beras per kg

  const nisabPenghasilanBulan = 7000000;
  const nisabMaal = 85000000;

  // Perhitungan Zakat Penghasilan
  const totalPenghasilanBulan = (Number(penghasilanBulanan) || 0) + (Number(penghasilanLain) || 0);
  const totalPenghasilanTahun = totalPenghasilanBulan * 12;
  const wajibZakatPenghasilan = totalPenghasilanBulan >= nisabPenghasilanBulan;
  const jumlahZakatPenghasilan = wajibZakatPenghasilan ? totalPenghasilanTahun * 0.025 : 0;

  // Perhitungan Zakat Maal
  const bersihMaal = (Number(totalTabungan) || 0) + (Number(hartaLain) || 0) - (Number(hutang) || 0);
  const wajibZakatMaal = bersihMaal >= nisabMaal;
  const jumlahZakatMaal = wajibZakatMaal ? bersihMaal * 0.025 : 0;

  // Perhitungan Zakat Fitrah (2.5 kg atau 3.5 liter beras per jiwa)
  const beratBerasPerJiwa = 2.5;
  const totalJiwa = Number(jumlahJiwa) || 0;
  const totalBerasFitrah = totalJiwa * beratBerasPerJiwa;
  const totalUangFitrah = totalBerasFitrah * (Number(hargaBerasPerKg) || 0);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Navigasi Kembali menggunakan router.back() */}
      <div className="mb-6 mt-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium cursor-pointer"
        >
          <span>←</span> Kembali ke Sebelumnya
        </button>
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Kalkulator Zakat</h1>
        <p className="text-slate-500 dark:text-slate-400">Hitung kewajiban zakat penghasilan, harta, dan zakat fitrah dengan mudah</p>
      </div>

      {/* Pilihan Jenis Zakat (Tabs) */}
      <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 max-w-xl mx-auto gap-1">
        <button
          onClick={() => setJenisZakat('penghasilan')}
          className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            jenisZakat === 'penghasilan' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
          }`}
        >
          💼 Penghasilan
        </button>
        <button
          onClick={() => setJenisZakat('maal')}
          className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            jenisZakat === 'maal' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
          }`}
        >
          💰 Zakat Maal
        </button>
        <button
          onClick={() => setJenisZakat('fitrah')}
          className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            jenisZakat === 'fitrah' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
          }`}
        >
          🌾 Zakat Fitrah
        </button>
      </div>

      {/* KONTEN KALKULATOR PENGHASILAN */}
      {jenisZakat === 'penghasilan' && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 transition-colors">
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-3">Kalkulator Zakat Penghasilan (Profesi)</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Zakat penghasilan wajib dikeluarkan jika penghasilan bulanan telah mencapai nisab (setara harga 85 gram emas per tahun atau ± Rp 7.000.000 / bulan). Besaran zakat adalah 2.5%.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Pendapatan Bulanan (Gaji Utama)</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <span className="text-slate-400 font-bold mr-2">Rp</span>
                <input
                  type="number"
                  value={penghasilanBulanan}
                  onChange={(e) => setPenghasilanBulanan(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 8000000"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Pendapatan Lain / Bonus / Usaha Sampingan (Bulanan)</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <span className="text-slate-400 font-bold mr-2">Rp</span>
                <input
                  type="number"
                  value={penghasilanLain}
                  onChange={(e) => setPenghasilanLain(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 1500000"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-2xl text-center space-y-3 mt-6">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Hasil Perhitungan Zakat</p>
            <div className="space-y-1">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Total Penghasilan Bulanan: <strong className="text-slate-800 dark:text-slate-100">{formatRupiah(totalPenghasilanBulan)}</strong>
              </p>
              <p className={`text-xs font-semibold ${wajibZakatPenghasilan ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {wajibZakatPenghasilan ? '✅ Telah mencapai nisab wajib zakat' : '⚠️ Belum mencapai nisab (Nisab ± Rp 7 Juta/bulan)'}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-200 dark:border-emerald-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Zakat yang harus dibayar (2.5% per tahun / dibayar bulanan):</p>
              <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
                {formatRupiah(jumlahZakatPenghasilan / 12)} <span className="text-xs font-normal text-slate-600 dark:text-slate-400">/ bulan</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN KALKULATOR ZAKAT MAAL */}
      {jenisZakat === 'maal' && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 transition-colors">
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-3">Kalkulator Zakat Maal (Harta & Tabungan)</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Zakat maal wajib dikeluarkan atas harta yang telah tersimpan selama 1 tahun (haul) dan mencapai nisab (setara 85 gram emas atau ± Rp 85.000.000). Besaran zakat adalah 2.5%.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Total Tabungan / Deposito / Saldo Bank</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <span className="text-slate-400 font-bold mr-2">Rp</span>
                <input
                  type="number"
                  value={totalTabungan}
                  onChange={(e) => setTotalTabungan(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 100000000"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Aset / Nilai Barang Berharga / Surat Berharga Lainnya</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <span className="text-slate-400 font-bold mr-2">Rp</span>
                <input
                  type="number"
                  value={hartaLain}
                  onChange={(e) => setHartaLain(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 20000000"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Hutang / Kewajiban Jatuh Tempo (Pengurang)</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <span className="text-slate-400 font-bold mr-2">Rp</span>
                <input
                  type="number"
                  value={hutang}
                  onChange={(e) => setHutang(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 5000000"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-2xl text-center space-y-3 mt-6">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Hasil Perhitungan Zakat Maal</p>
            <div className="space-y-1">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Total Harta Bersih: <strong className="text-slate-800 dark:text-slate-100">{formatRupiah(bersihMaal)}</strong>
              </p>
              <p className={`text-xs font-semibold ${wajibZakatMaal ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {wajibZakatMaal ? '✅ Telah mencapai nisab wajib zakat (Nisab ± Rp 85 Juta)' : '⚠️ Belum mencapai nisab zakat harta'}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-200 dark:border-emerald-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Zakat Maal yang harus dibayar (2.5% per tahun):</p>
              <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">{formatRupiah(jumlahZakatMaal)}</p>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN KALKULATOR ZAKAT FITRAH */}
      {jenisZakat === 'fitrah' && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 transition-colors">
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-3">Kalkulator Zakat Fitrah</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Zakat fitrah wajib ditunaikan oleh setiap jiwa (Muslim) yang mampu menjelang Idul Fitri. Besarannya adalah 2,5 kg beras per jiwa atau dapat dikonversikan dengan uang tunai.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Jumlah Tanggungan Keluarga (Jiwa)</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <input
                  type="number"
                  value={jumlahJiwa}
                  onChange={(e) => setJumlahJiwa(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 4"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
                <span className="text-slate-400 font-medium ml-2">Jiwa</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Estimasi Harga Beras per Kilogram (Jika dibayar uang)</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                <span className="text-slate-400 font-bold mr-2">Rp</span>
                <input
                  type="number"
                  value={hargaBerasPerKg}
                  onChange={(e) => setHargaBerasPerKg(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Contoh: 15000"
                  className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-2xl text-center space-y-4 mt-6">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Hasil Perhitungan Zakat Fitrah</p>

            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-emerald-200 dark:border-emerald-900/50">
              <div className="bg-white/80 dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Beras:</p>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {totalBerasFitrah} <span className="text-xs font-normal text-slate-600 dark:text-slate-400">Kg</span>
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Jiwa:</p>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {totalJiwa} <span className="text-xs font-normal text-slate-600 dark:text-slate-400">Jiwa</span>
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Zakat Fitrah yang harus dibayar dengan Uang:</p>
              <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">{formatRupiah(totalUangFitrah)}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
