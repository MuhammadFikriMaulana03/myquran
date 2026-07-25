// src/components/AudioPlayer.tsx
'use client';

import { useState, useRef } from 'react';

interface Props {
  audioUrls: Record<string, string> | null;
  namaSurat?: string;
}

export default function AudioPlayer({ audioUrls, namaSurat }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedQari, setSelectedQari] = useState('01');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Menyimpan posisi detik audio terakhir agar tidak hilang saat ganti qari
  const currentTimeRef = useRef<number>(0);

  if (!audioUrls) return null;

  const qariList = [
    { id: '01', nama: 'Abdullah Al-Juhany' },
    { id: '02', nama: 'Abdul Muhsin Al-Qasim' },
    { id: '03', nama: 'Abdurrahman As-Sudais' },
    { id: '04', nama: 'Ibrahim Al-Akhdar' },
    { id: '05', nama: 'Maher Al-Muaiqly' },
  ];

  const currentAudioUrl = audioUrls[selectedQari] || Object.values(audioUrls)[0];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // 🔴 Penanganan khusus Safari untuk memastikan play() tidak diblokir
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Gagal memutar audio di Safari:', err);
          setIsPlaying(false);
        });
    }
  };

  // Rekam posisi detik saat audio sedang berjalan
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      currentTimeRef.current = audioRef.current.currentTime;
    }
  };

  // Ketika qari baru selesai dimuat datanya, langsung lompat ke detik terakhir yang direkam
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTimeRef.current;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Saat pilihan qari diubah
  const handleQariChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (audioRef.current) {
      // Simpan posisi detik saat ini sebelum ganti sumber audio
      currentTimeRef.current = audioRef.current.currentTime;
    }
    setSelectedQari(e.target.value);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 bg-emerald-900/95 text-white backdrop-blur-xl shadow-2xl rounded-2xl p-4 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 transition-all">
      <audio ref={audioRef} src={currentAudioUrl} preload="none" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} />

      {/* Tombol Play/Pause & Info Surat */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <button onClick={togglePlay} className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-sm">
          <span>{isPlaying ? '⏸️ Pause Murottal' : '▶️ Putar Murottal'}</span>
        </button>
        {namaSurat && <span className="text-xs font-medium text-emerald-200 truncate max-w-[130px] sm:max-w-[160px]">{namaSurat}</span>}
      </div>

      {/* Pilihan Qari */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
        <span className="text-xs text-emerald-200 font-medium whitespace-nowrap">Qari:</span>
        <select value={selectedQari} onChange={handleQariChange} className="bg-emerald-800 border border-emerald-600 text-white text-xs font-medium rounded-xl px-3 py-2 outline-none cursor-pointer">
          {qariList.map(
            (q) =>
              audioUrls[q.id] && (
                <option key={q.id} value={q.id}>
                  {q.nama}
                </option>
              ),
          )}
        </select>
      </div>
    </div>
  );
}
