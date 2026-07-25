// src/data/solatSunnah.ts

export interface SolatSunnahItem {
  id: number;
  nama: string;
  waktu: string;
  rakaat: string;
  keutamaan: string;
  niat: {
    arab: string;
    latin: string;
    arti: string;
  };
  tataCara: string[];
}

export const dataSolatSunnah: SolatSunnahItem[] = [
  {
    id: 1,
    nama: 'Sholat Idul Fitri',
    waktu: 'Pagi hari tanggal 1 Syawal, mulai dari matahari terbit setinggi tombak hingga tergelincir matahari.',
    rakaat: '2 rakaat (dilaksanakan secara berjamaah di lapangan atau masjid).',
    keutamaan: 'Merayakan hari kemenangan umat Islam setelah sebulan penuh berpuasa Ramadan dan mempererat silaturahmi.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ عِيدِ الْفِطْرِ رَكْعَتَيْنِ (مَأْمُومًا / إِمَامًا) لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal 'iidil fithri rak'ataini (ma'muuman/imaaman) lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Idul Fitri dua rakaat (sebagai makmum/imam) karena Allah Taala.”',
    },
    tataCara: [
      '1. Disunnahkan mandi besar sebelum berangkat, memakai pakaian terbaik, dan makan sedikit terlebih dahulu.',
      '2. Sholat dilaksanakan tanpa azan dan iqamah, melainkan cukup dengan seruan "As-sholatu jaami\'ah".',
      '3. Pada rakaat pertama, setelah takbiratul ihram dan doa iftitah, melakukan takbir tambahan sebanyak 7 kali.',
      '4. Di setiap sela-sela takbir tambahan, mengangkat kedua tangan dan membaca tasbih: "Subhanallah wal hamdulillah wa laa ilaaha illallahu wallahu akbar".',
      "5. Membaca Surat Al-Fatihah, dilanjutkan membaca surat pendek (disunnahkan surat Al-A'la).",
      '6. Melakukan ruku, iktidal, dan sujud dua kali seperti sholat biasa, lalu bangkit berdiri untuk rakaat kedua.',
      '7. Pada rakaat kedua, melakukan takbir tambahan sebanyak 5 kali sebelum membaca Al-Fatihah, diselingi bacaan tasbih di setiap sela-selanya.',
      '8. Membaca Al-Fatihah dan surat pendek (disunnahkan surat Al-Ghasyiyah), lalu ruku, sujud, dan tasyahud akhir hingga salam.',
      '9. Setelah salam, jamaah dianjurkan untuk duduk tenang mendengarkan khotbah Idul Fitri sampai selesai.',
    ],
  },
  {
    id: 2,
    nama: 'Sholat Idul Adha',
    waktu: 'Pagi hari tanggal 10 Zulhijjah, mulai dari matahari terbit setinggi tombak.',
    rakaat: '2 rakaat (dilaksanakan secara berjamaah di lapangan atau masjid).',
    keutamaan: 'Syiar agung perayaan hari raya qurban dan mengenang keteladanan agung Nabi Ibrahim AS.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ عِيدِ الأَضْحَى رَكْعَتَيْنِ (مَأْمُومًا / إِمَامًا) لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal 'iidil adha rak'ataini (ma'muuman/imaaman) lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Idul Adha dua rakaat (sebagai makmum/imam) karena Allah Taala.”',
    },
    tataCara: [
      '1. Disunnahkan untuk tidak makan terlebih dahulu sebelum selesai sholat (bagi yang hendak berqurban).',
      '2. Datang ke lapangan/masjid dengan memperbanyak kumandang takbir.',
      '3. Pada rakaat pertama, melakukan takbir tambahan sebanyak 7 kali dengan mengangkat tangan dan membaca tasbih di setiap selahnya.',
      "4. Membaca Al-Fatihah dan surat Al-A'la, dilanjutkan ruku dan sujud seperti biasa.",
      '5. Pada rakaat kedua, melakukan takbir tambahan sebanyak 5 kali sebelum membaca Al-Fatihah.',
      '6. Membaca surat Al-Ghasyiyah setelah Al-Fatihah, lalu menyempurnakan rakaat hingga salam.',
      '7. Mendengarkan dua khotbah Idul Adha yang disampaikan oleh khatib setelah sholat selesai.',
    ],
  },
  {
    id: 3,
    nama: 'Sholat Dhuha',
    waktu: 'Mulai dari matahari terbit setinggi tombak (pukul 07.00) hingga menjelang waktu dzuhur.',
    rakaat: 'Minimal 2 rakaat, maksimal 12 rakaat (salam setiap 2 rakaat).',
    keutamaan: 'Membuka pintu rezeki, mencukupkan kebutuhan harian, dan bernilai sedekah bagi seluruh persendian tubuh.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatadh-dhuhaa rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Dhuha dua rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Membaca niat sholat Dhuha dalam hati.',
      '2. Takbiratul ihram dan membaca doa Iftitah.',
      '3. Membaca Surat Al-Fatihah, dilanjutkan membaca surat pendek (disunnahkan surat Al-Syams pada rakaat pertama dan Ad-Duha pada rakaat kedua).',
      '4. Melakukan ruku, iktidal, dan dua kali sujud seperti sholat fardhu.',
      '5. Mengerjakan rakaat kedua dengan tata cara yang sama persis.',
      '6. Tasyahud akhir pada rakaat kedua, kemudian mengucapkan salam ke kanan dan ke kiri.',
      '7. Disunnahkan membaca Doa Dhuha khusus setelah selesai melaksanakan sholat.',
    ],
  },
  {
    id: 4,
    nama: 'Sholat Tahajud',
    waktu: 'Sepertiga malam terakhir setelah terbangun dari tidur (pukul 01.00 sampai sebelum Subuh).',
    rakaat: 'Minimal 2 rakaat, tidak ada batasan maksimal (ditutup dengan Sholat Witir).',
    keutamaan: 'Sebaik-baiknya sholat sunnah, doa mudah dikabulkan, dan diangkat ke tempat yang terpuji (Mahmudah).',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatat-tahajjudi rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Tahajud dua rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Bangun dari tidur malam hari (disunnahkan membersihkan gigi/bersiwak dan berwudhu).',
      '2. Membaca niat sholat Tahajud.',
      '3. Melakukan takbiratul ihram, membaca Al-Fatihah dan surat panjang dari Al-Quran dengan khusyuk.',
      "4. Melakukan ruku, iktidal, dan sujud dengan tuma'ninah.",
      '5. Mengerjakan salam setiap genap 2 rakaat.',
      '6. Setelah selesai seluruh rangkaian sholat malam, ditutup dengan Sholat Witir.',
    ],
  },
  {
    id: 5,
    nama: 'Sholat Hajat',
    waktu: 'Bisa dikerjakan kapan saja siang atau malam hari (paling utama di sepertiga malam terakhir).',
    rakaat: '2 hingga 12 rakaat (salam setiap 2 rakaat).',
    keutamaan: 'Sarana memohon agar segala hajat, keinginan, atau urusan penting dikabulkan oleh Allah SWT.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الْحَاجَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-haajati rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Hajat dua rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Berwudhu dengan sempurna dan memakai pakaian yang suci.',
      '2. Membaca niat sholat Hajat dalam hati.',
      '3. Pada rakaat pertama disunnahkan membaca Ayat Kursi setelah Al-Fatihah.',
      '4. Pada rakaat kedua disunnahkan membaca surat Al-Ikhlas setelah Al-Fatihah.',
      '5. Menyelesaikan 2 rakaat hingga salam.',
      '6. Setelah salam, bersujud kembali (sujud syukur/hajat) secara khusus untuk merendahkan diri dan memohon hajat dalam hati kepada Allah SWT.',
    ],
  },
  {
    id: 6,
    nama: 'Sholat Witir',
    waktu: 'Setelah sholat Isya hingga terbit fajar (menjadi penutup sholat malam).',
    rakaat: 'Ganjil, bisa 1, 3, 5, 7, 9, atau 11 rakaat.',
    keutamaan: 'Penutup ibadah malam yang sangat dicintai oleh Rasulullah SAW.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الْوِتْرِ رَكْعَةً لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-witri rak'atan lillaahi ta'ala.",
      arti: "“Aku niat sholat sunnah Witir satu rakaat karena Allah Taala.” (Jika 2 rakaat awal: rak'ataini).",
    },
    tataCara: [
      '1. Dikerjakan sebagai penutup rangkaian sholat malam.',
      '2. Jika dikerjakan 3 rakaat, bisa langsung 1 kali salam atau 2 rakaat salam lalu ditambah 1 rakaat salam.',
      '3. Membaca surat Al-A’la pada rakaat pertama, Al-Kafirun pada rakaat kedua, dan Al-Ikhlas, Al-Falaq, An-Nas pada rakaat terakhir.',
      '4. Pada separuh akhir bulan Ramadan, dianjurkan membaca doa Qunut pada rakaat terakhir.',
    ],
  },
  {
    id: 7,
    nama: 'Sholat Tasbih',
    waktu: 'Bisa dikerjakan pada siang hari (1 salam) atau malam hari (2 salam).',
    rakaat: '4 rakaat.',
    keutamaan: 'Pahala yang sangat besar, diampuni seluruh dosa baik yang kecil maupun besar, awal maupun akhir.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ التَّسْبِيحِ أَرْبَعَ رَكَعَاتٍ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatat-tasbihi arba'a raka'atin lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Tasbih empat rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Membaca niat sholat Tasbih empat rakaat.',
      '2. Pada setiap rakaat, membaca kalimat tasbih sebanyak 75 kali (Total 300 kali dalam 4 rakaat).',
      '3. Bacaan tasbih: "Subhaanallah wal hamdulillah wa laa ilaaha illallahu wallahu akbar".',
      '4. Dibaca 15 kali usai membaca surat pendek, 10 kali saat ruku, 10 kali saat iktidal, 10 kali saat sujud pertama, 10 kali saat duduk di antara dua sujud, 10 kali saat sujud kedua, dan 10 kali sebelum bangkit berdiri (duduk istirahat).',
    ],
  },
  {
    id: 8,
    nama: 'Sholat Istikharah',
    waktu: 'Bisa dikerjakan kapan saja siang atau malam hari saat menghadapi keraguan pilihan.',
    rakaat: '2 rakaat.',
    keutamaan: 'Memohon petunjuk pilihan terbaik, penuh berkah, dan dijauhkan dari kemudharatan.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الاِسْتِخَارَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-istikharati rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Istikharah dua rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Berwudhu dengan sempurna dan mendirikan sholat sunnah dua rakaat seperti biasa.',
      '2. Membaca surat Al-Kafirun pada rakaat pertama dan Al-Ikhlas pada rakaat kedua.',
      '3. Setelah salam, duduk dengan khusyuk lalu membaca Doa Istikharah khusus yang memohon kemudahan serta kepastian pilihan.',
    ],
  },
  {
    id: 9,
    nama: 'Sholat Taubat',
    waktu: 'Kapan saja siang atau malam hari, terutama saat bertaubat kepada Allah.',
    rakaat: '2 rakaat.',
    keutamaan: 'Sarana memohon ampunan yang tulus atas segala dosa dan kesalahan yang telah diperbuat.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ التَّوْبَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatat-taubati rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Taubat dua rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Berwudhu dengan niat yang tulus untuk membersihkan diri.',
      '2. Melaksanakan sholat dua rakaat secara khusyuk dan tenang.',
      '3. Setelah salam, duduk beristighfar dengan memperbanyak bacaan "Astaghfirullahal \'azhim wa atubu ilaih" (atau Sayyidul Istighfar) dengan penuh penyesalan dan tekad tidak mengulangi.',
    ],
  },
  {
    id: 10,
    nama: 'Sholat Sunnah Wudhu (Syukrul Wudhu)',
    waktu: 'Setiap kali selesai berwudhu (baik siang maupun malam hari).',
    rakaat: '2 rakaat.',
    keutamaan: 'Menjadi sebab dibukanya pintu surga bagi yang mengerjakannya secara ikhlas.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الْوُضُوءِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-wudhuu'i rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah wudhu dua rakaat karena Allah Taala.”',
    },
    tataCara: ['1. Dilakukan segera setelah selesai menyempurnakan wudhu (sebelum air wudhu di anggota badan mengering).', '2. Melaksanakan sholat sunnah 2 rakaat secara ringkas seperti sholat sunnah mutlak.'],
  },
  {
    id: 11,
    nama: 'Sholat Safar (Bepergian)',
    waktu: 'Hendak melakukan perjalanan jauh (safar) keluar rumah.',
    rakaat: '2 rakaat.',
    keutamaan: 'Memohon keselamatan, penjagaan, dan keberkahan selama dalam perjalanan.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ السَّفَرِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-safari rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah safar dua rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Dikerjakan 2 rakaat di rumah sesaat sebelum melangkah keluar untuk bepergian jauh.',
      '2. Pada rakaat pertama membaca Al-Fatihah dan surat Al-Kafirun, pada rakaat kedua membaca surat Al-Ikhlas.',
      '3. Setelah salam, membaca doa safar agar senantiasa dilindungi oleh Allah SWT.',
    ],
  },
  {
    id: 12,
    nama: 'Sholat Qabliyah Subuh (Fajar)',
    waktu: 'Sebelum melaksanakan sholat fardhu Subuh.',
    rakaat: '2 rakaat.',
    keutamaan: "Pahala sunnah mu'akkadah paling utama yang nilainya lebih baik daripada dunia dan seisinya.",
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الصُّبْحِ رَكْعَتَيْنِ قَبْلِيَّةً لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatas-subhi rak'ataini qabliyatan lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah qabliyah Subuh dua rakaat karena Allah Taala.”',
    },
    tataCara: ['1. Dikerjakan setelah azan Subuh berkumandang sebelum iqamah.', '2. Membaca surat Al-Kafirun pada rakaat pertama dan Al-Ikhlas pada rakaat kedua secara ringkas.'],
  },
  {
    id: 13,
    nama: "Sholat Rawatib (Qabliyah & Ba'diyah)",
    waktu: 'Mengiringi waktu sholat fardhu 5 waktu.',
    rakaat: '2 rakaat per salam.',
    keutamaan: 'Menyempurnakan kekurangan sholat fardhu dan dibangunkan rumah di surga.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الظُّهْرِ قَبْلِيَّةً رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatazh-zhuhri qabliyatan rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah qabliyah Dzuhur dua rakaat karena Allah Taala.” (Sesuaikan dengan sholat fardhunya).',
    },
    tataCara: [
      '1. Dikerjakan sebelum sholat fardhu (Qabliyah) seperti sebelum Subuh dan Dzuhur.',
      "2. Dikerjakan sesudah sholat fardhu (Ba'diyah) seperti sesudah Dzuhur, Maghrib, dan Isya.",
      '3. Dilakukan sebanyak 2 rakaat dengan 1 kali salam tanpa azan dan iqamah.',
    ],
  },
  {
    id: 14,
    nama: 'Sholat Tahiyyatul Masjid',
    waktu: 'Saat pertama kali menginjakkan kaki di dalam masjid sebelum duduk.',
    rakaat: '2 rakaat.',
    keutamaan: 'Sebagai bentuk penghormatan dan pemuliaan kepada rumah Allah (masjid).',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ تَحِيَّةِ الْمَسْجِدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-tahiyyatil-masjidi rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah tahiyyatul masjid dua rakaat karena Allah Taala.”',
    },
    tataCara: ['1. Begitu melangkah masuk ke dalam area masjid, langsung berdiri menghadap kiblat.', '2. Tidak boleh duduk terlebih dahulu sebelum menunaikan sholat sunnah 2 rakaat ini.'],
  },
  {
    id: 15,
    nama: 'Sholat Gerhana (Kusuf & Khusuf)',
    waktu: 'Saat terjadinya peristiwa gerhana matahari atau gerhana bulan.',
    rakaat: '2 rakaat (dengan 2 kali ruku dan 2 kali bacaan Al-Fatihah di setiap rakaatnya).',
    keutamaan: 'Mengagungkan kebesaran Allah SWT dan momentum memperbanyak dzikir serta sedekah.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ خُسُوفِ الْقَمَرِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-khusufil-qamari rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah gerhana bulan dua rakaat karena Allah Taala.” (Ganti "Kusufil-syamsi" untuk matahari).',
    },
    tataCara: [
      '1. Takbiratul ihram, membaca doa Iftitah, Al-Fatihah, dan surat panjang.',
      '2. Melakukan ruku pertama, lalu bangkit iktidal (tanpa langsung sujud).',
      '3. Setelah iktidal, kembali membaca Al-Fatihah dan surat panjang untuk kedua kalinya dalam rakaat yang sama.',
      '4. Melakukan ruku kedua, iktidal kedua, lalu sujud dua kali seperti sholat biasa.',
      '5. Bangkit untuk rakaat kedua dengan tata cara dua kali ruku yang sama persis, lalu diakhiri salam.',
    ],
  },
  {
    id: 16,
    nama: 'Sholat Istisqa (Minta Hujan)',
    waktu: 'Saat terjadi musim kemarau panjang atas seruan pemimpin/ulama.',
    rakaat: '2 rakaat secara berjamaah di tanah lapang.',
    keutamaan: 'Memohon ampunan dan diturunkannya hujan rahmat serta keberkahan dari Allah SWT.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ الاِسْتِسْقَاءِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatal-istisqa'i rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah minta hujan dua rakaat karena Allah Taala.”',
    },
    tataCara: [
      '1. Dilakukan secara berjamaah di tanah lapang dengan pakaian sederhana dan penuh kekhusyukan.',
      '2. Pada rakaat pertama melakukan takbir 7 kali, dan rakaat kedua takbir 5 kali.',
      '3. Diakhiri dengan khotbah khusus istisqa di mana khatib dan jamaah membalikkan selendang serta memperbanyak doa istighfar.',
    ],
  },
  {
    id: 17,
    nama: 'Sholat Tarawih',
    waktu: 'Malam hari selama bulan suci Ramadan (setelah sholat Isya).',
    rakaat: '8 atau 20 rakaat (salam setiap 2 rakaat).',
    keutamaan: 'Menghidupkan malam Ramadan dan diampuni dosa-dosa yang telah lalu.',
    niat: {
      arab: 'أُصَلِّي سُنَّةَ التَّرَاوِيحِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatat-tarawiihi rak'ataini lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah Tarawih dua rakaat karena Allah Taala.”',
    },
    tataCara: ['1. Dikerjakan setiap malam bulan Ramadan setelah sholat Isya.', '2. Dilakukan dua rakaat sekali salam, diulang hingga genap (biasanya 8 atau 20 rakaat).', '3. Ditutup dengan melaksanakan sholat Witir.'],
  },
  {
    id: 18,
    nama: 'Sholat Mutlak',
    waktu: 'Kapan saja siang atau malam hari tanpa terikat sebab khusus.',
    rakaat: '2 rakaat (tanpa batasan maksimal).',
    keutamaan: 'Memperbanyak amalan sunnah kapan pun di luar waktu terlarang sholat.',
    niat: {
      arab: 'أُصَلِّي سُنَّةً لِلَّهِ تَعَالَى',
      latin: "Ushallii sunnatan lillaahi ta'ala.",
      arti: '“Aku niat sholat sunnah karena Allah Taala.”',
    },
    tataCara: ['1. Melaksanakan sholat dua rakaat dengan niat mutlak karena Allah.', '2. Tidak boleh dikerjakan pada waktu-waktu yang diharamkan (setelah Subuh hingga terbit matahari, dan saat matahari tepat di zenit/tengah hari).'],
  },
];
