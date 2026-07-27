'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HaditsPage() {
  const router = useRouter();
  const [haditsList, setHaditsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [grandTotal, setGrandTotal] = useState(0);
  const [perawiCounts, setPerawiCounts] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerawi, setSelectedPerawi] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const perawiList = [
    { name: 'abu-dawud', label: 'Abu Dawud', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50' },
    { name: 'bukhari', label: 'Bukhari', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50' },
    { name: 'muslim', label: 'Muslim', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50' },
    { name: 'tirmidzi', label: 'Tirmidzi', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50' },
    { name: 'nasai', label: 'An-Nasai', color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900/50' },
    { name: 'ibnu-majah', label: 'Ibnu Majah', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50' },
  ];

  useEffect(() => {
    async function fetchHadits() {
      setLoading(true);
      try {
        const res = await fetch(`/api/hadits?page=${page}&limit=12&search=${searchQuery}&perawi=${selectedPerawi}`);
        const json = await res.json();
        setHaditsList(json.data || []);
        setTotalPages(json.totalPages || 1);
        if (json.grandTotal) setGrandTotal(json.grandTotal);
        if (json.perawiCounts) setPerawiCounts(json.perawiCounts);
      } catch (error) {
        console.error('Gagal mengambil data hadis:', error);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchHadits();
    }, 250);

    return () => clearTimeout(timer);
  }, [page, searchQuery, selectedPerawi]);

  const handleCopy = (arab: string, terjemah: string, index: number) => {
    const textToCopy = `${arab}\n\n"${terjemah}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-5xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Kembali ke Dashboard
        </button>
      </div>

      {/* Header Halaman */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border border-emerald-200/50 dark:border-emerald-800/40">
          Kitab Sunnah
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
          Pustaka <span className="text-emerald-600 dark:text-emerald-400">Hadits Pilihan</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Jelajahi koleksi hadis otentik dengan terjemahan bahasa Indonesia untuk membimbing keseharianmu.</p>
      </div>

      {/* Control Panel: Search & Filter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 md:p-6 rounded-3xl shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Cari lafaz arab atau terjemahan hadis..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          {/* Dropdown dengan Angka Total */}
          <select
            value={selectedPerawi}
            onChange={(e) => {
              setSelectedPerawi(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
          >
            <option value="">Semua Perawi Kitab ({grandTotal})</option>
            {perawiList.map((p) => (
              <option key={p.name} value={p.name}>
                HR. {p.label} ({perawiCounts[p.name] || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Quick Filter Pill Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              setSelectedPerawi('');
              setPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedPerawi === '' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua ({grandTotal})
          </button>
          {perawiList.map((p) => {
            const count = perawiCounts[p.name] || 0;
            return (
              <button
                key={p.name}
                onClick={() => {
                  setSelectedPerawi(p.name);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                  selectedPerawi === p.name ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 shadow-md' : `${p.color} border`
                }`}
              >
                HR. {p.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar Hadis Cards */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 font-medium animate-pulse">Memuat mutiara hadis...</p>
          </div>
        ) : haditsList.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl">
            <span className="text-4xl mb-3 block">📭</span>
            <p className="text-slate-600 dark:text-slate-300 font-bold text-base">Hadis tidak ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci atau filter perawi yang lain.</p>
          </div>
        ) : (
          haditsList.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 relative"
            >
              {/* Header Card */}
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                  📖 HR. {item.perawi}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">No. {item.nomor}</span>
                  <button
                    onClick={() => handleCopy(item.arab, item.terjemah, idx)}
                    title="Salin Hadis"
                    className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl transition-all"
                  >
                    {copiedIndex === idx ? '✅' : '📋'}
                  </button>
                </div>
              </div>

              {/* Teks Arab */}
              <div className="bg-slate-50/60 dark:bg-slate-950/40 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                <p className="text-right text-2xl md:text-3xl font-arabic leading-[2.2] text-slate-900 dark:text-slate-100">{item.arab}</p>
              </div>

              {/* Teks Terjemahan */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">Terjemahan</p>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{item.terjemah}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Dinamis */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-6 py-4 rounded-2xl shadow-sm mt-8">
          <button
            onClick={() => {
              setPage((p) => Math.max(p - 1, 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={page === 1}
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
          >
            ← Sebelumnya
          </button>

          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Halaman <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{page}</span> dari {totalPages}
          </div>

          <button
            onClick={() => {
              setPage((p) => Math.min(p + 1, totalPages));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={page === totalPages}
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
          >
            Selanjutnya →
          </button>
        </div>
      )}
    </main>
  );
}
