// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import DarkModeToggle from '../components/DarkModeToggle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MyQuran App • Dashboard Islami',
  description: 'Aplikasi Al-Quran dan Jadwal Sholat Modern',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* TAMBAHAN KECIL: Skrip ini membaca localStorage sebelum halaman dirender agar tidak berkedip */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300`} suppressHydrationWarning>
        {/* HEADER GLOBAL / TOMBOL DARK MODE */}
        <header className="max-w-6xl mx-auto px-4 md:px-8 pt-4 flex justify-end">
          <DarkModeToggle />
        </header>

        {children}
      </body>
    </html>
  );
}
