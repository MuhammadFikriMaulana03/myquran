// src/app/tajwid/page.tsx
'use client';

import BackButton from '../../components/BackButton';

export default function PanduanTajwidPage() {
  const materiTajwid = [
    {
      judul: 'Ghunnah',
      warna: 'bg-amber-500 text-white',
      ketentuan: 'Ketika huruf Nun ber-Tasydid (نّ) atau Mim ber-Tasydid (مّ), tanda tasyid itu yang seperti huruf w.',
      caraBaca: 'Didengungkan serta ditahan sekitar 2 harakat sebelum menyebut jelas huruf Nun/Mim-nya.',
      contoh: 'ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ',
    },
    {
      judul: 'Idgham Bighunnah',
      warna: 'bg-purple-600 text-white',
      ketentuan: 'Ketika huruf Nun mati (نْ) atau Tanwin (ً ٍ ٌ) bertemu dengan salah satu dari 4 huruf ini (ي ن م و).',
      caraBaca: 'Meleburkan nun mati atau tanwin dengan huruf di depannya dan seolah-olah huruf N di nun mati tidak dibaca, sambil didengungkan serta ditahan sekitar 2 harakat.',
      contoh: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُۥ',
    },
    {
      judul: 'Idgham Bilaghunnah',
      warna: 'bg-slate-700 text-white',
      ketentuan: 'Ketika huruf Nun mati (نْ) atau Tanwin bertemu dengan salah satu dari 2 huruf ini: Lam (ل) atau Ra (ر).',
      caraBaca: 'Meleburkan nun mati atau tanwin dengan huruf di depannya tanpa didengungkan serta ditahan sekitar 1 atau 2 harakat.',
      contoh: 'وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ',
    },
    {
      judul: 'Idgham Mitslain (Mimi)',
      warna: 'bg-yellow-500 text-slate-900',
      ketentuan: 'Ketika huruf Mim mati (مْ) bertemu dengan huruf Mim (م) berharakat (Mim hidup).',
      caraBaca: 'Meleburkan mim mati dengan mim berharakat di depannya sambil didengungkan serta ditahan sekitar 2 harakat.',
      contoh: 'رَاْنٍ عَلَى قُلُوْبِهِمْ مَّا كَانُوا يَكْسِبُوْنَ',
    },
    {
      judul: 'Iqlab',
      warna: 'bg-blue-600 text-white',
      ketentuan: 'Ketika huruf Nun mati (نْ) atau Tanwin bertemu dengan huruf Ba (ب).',
      caraBaca: 'Menggantikan huruf nun mati atau tanwin dengan huruf mim mati serta ditahan sekitar 2 harakat sebelum menyebut jelas huruf Ba-nya.',
      contoh: 'أَلَمْ بِمَا كَانُوا يُكَذِّبُونَ',
    },
    {
      judul: 'Ikhfa',
      warna: 'bg-rose-600 text-white',
      ketentuan: 'Ketika huruf Nun mati (نْ) atau Tanwin bertemu dengan salah satu dari 15 huruf (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك).',
      caraBaca: 'Menyamarkan huruf nun mati atau tanwin seperti huruf NG serta ditahan sekitar 2 harakat.',
      contoh: 'وَكُنْتُمْ أَمْوَاتًا فَأَحْيَاكُمْ',
    },
    {
      judul: 'Qalqalah',
      warna: 'bg-emerald-600 text-white',
      ketentuan: 'Ketika salah satu dari 5 huruf (ق ط ب ج د) mati (sukun) di tengah kalimat (Qalqalah Sughra) atau di akhir ayat karena waqaf (Qalqalah Kubra).',
      caraBaca: 'Dipantulkan dengan suara membalik atau bergetar.',
      contoh: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    },
  ];

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mb-6 mt-4">
        <BackButton />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-2">Panduan & Pengaturan Tajwid</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Referensi hukum bacaan tajwid lengkap sesuai standar Mushaf.</p>
      </div>

      <div className="space-y-6">
        {materiTajwid.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold px-4 py-1.5 rounded-full text-sm ${item.warna}`}>{item.judul}</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ketentuan:</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{item.ketentuan}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cara Baca:</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.caraBaca}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Contoh Ayat:</p>
                <p className="text-2xl font-serif text-right text-emerald-700 dark:text-emerald-400 leading-[2.2]" dir="rtl">
                  {item.contoh}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
