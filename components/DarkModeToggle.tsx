// src/components/DarkModeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Cek status dark mode saat komponen dimuat (Ini otomatis akan membaca hasil dari script di layout)
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 rounded-full shadow-2xl border border-slate-200/80 dark:border-slate-800 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer font-medium text-xs group"
      title="Ubah Tema"
    >
      <span className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:rotate-45 text-sm shadow-inner">
        {darkMode ? '🌙' : '☀️'}
      </span>
      <span className="font-bold tracking-wide pr-1">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}
