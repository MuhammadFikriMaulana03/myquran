// src/data/dzikirData.ts

export interface DzikirItem {
  id: number;
  judul: string;
  arab: string;
  latin: string;
  arti: string;
  keutamaan?: string;
  ulangan: number; // Jumlah bacaan (misal 1x, 3x, 100x)
}

export const dzikirPagiData: DzikirItem[] = [
  {
    id: 1,
    judul: "Ta'awudz & Membaca Ayat Kursi",
    arab: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    latin: "A'udzu billahi minas-syaitanir-rajim. Allaahu laa ilaaha illaa huwal hayyul qayyum...",
    arti: '“Aku berlindung kepada Allah dari godaan syaitan yang terkutuk. Allah, tidak ada Tuhan selain Dia Yang Hidup Kekal lagi terus menerus mengurus makhluk-Nya...” (Dibaca sampai akhir Ayat Kursi).',
    ulangan: 1,
    keutamaan: 'Barangsiapa membacanya di pagi hari, ia akan dilindungi dari gangguan jin hingga sore hari.',
  },
  {
    id: 2,
    judul: 'Membaca Surat Al-Ikhlas, Al-Falaq, dan An-Nas',
    arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قُلْ هُوَ اللَّهُ أَحَدٌ... (وَالمُعَوِّذَتَيْن)',
    latin: 'Bismillahir-rahmanir-rahim. Qul huwallahu ahad... (dilanjut Al-Falaq & An-Nas).',
    arti: '“Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Katakanlah: Dialah Allah, Yang Maha Esa...”',
    ulangan: 3,
    keutamaan: 'Cukup baginya perlindungan dari segala sesuatu jika dibaca masing-masing 3 kali di pagi dan petang.',
  },
  {
    id: 3,
    judul: 'Sayyidul Istighfar',
    arab: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...',
    latin: "Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa 'abduka...",
    arti: '“Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau. Engkau yang menciptakanku dan aku adalah hamba-Mu...”',
    ulangan: 1,
    keutamaan: 'Barangsiapa membacanya di pagi hari dengan yakin lalu meninggal dunia pada hari itu, maka ia termasuk penghuni surga.',
  },
  {
    id: 4,
    judul: 'Dzikir Keselamatan & Perlindungan',
    arab: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillahilladzii laa yadhurru ma'asmihi syai'un fil-ardhi wa laa fis-samaa'i wahuwas-sami'ul 'aliim.",
    arti: '“Dengan nama Allah yang bersama nama-Nya tidak ada satupun yang berbahaya di bumi maupun di langit, dan Dia Maha Mendengar lagi Maha Mengetahui.”',
    ulangan: 3,
    keutamaan: 'Tidak akan dikejutkan oleh musibah yang datang tiba-tiba hingga sore hari.',
  },
  {
    id: 5,
    judul: 'Ridho kepada Allah, Islam, dan Nabi Muhammad',
    arab: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا',
    latin: 'Radhiitu billahi rabba, wa bil-islaami diina, wa bi-muhammadin nabiyya.',
    arti: '“Aku ridho Allah sebagai Tuhan kami, Islam sebagai agama kami, dan Muhammad sebagai Nabi kami.”',
    ulangan: 3,
    keutamaan: 'Hak Allah untuk meridhoinya kelak di hari kiamat.',
  },
  {
    id: 6,
    judul: 'Tasbih & Tahmid',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    latin: "Subhaanallahi wa bihamdihi, 'adada khalqihi, wa ridhaa nafsihi, wa zinata 'arsyih, wa midaada kalimatihi.",
    arti: "“Maha Suci Allah dan segala puji bagi-Nya, sebanyak ciptaan-Nya, sejauh keridaan-Nya, seberat timbangan 'Arasy-nya, dan sebanyak tinta kalimat-Nya.”",
    ulangan: 3,
    keutamaan: 'Pahala dzikir ini menandingi dzikir yang dibaca semalaman penuh.',
  },
];

export const dzikirPetangData: DzikirItem[] = [
  {
    id: 1,
    judul: "Ta'awudz & Membaca Ayat Kursi",
    arab: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    latin: "A'udzu billahi minas-syaitanir-rajim. Allaahu laa ilaaha illaa huwal hayyul qayyum...",
    arti: '“Aku berlindung kepada Allah dari godaan syaitan yang terkutuk. Allah, tidak ada Tuhan selain Dia Yang Hidup Kekal...”',
    ulangan: 1,
    keutamaan: 'Dilindungi dari gangguan jin hingga pagi hari berikutnya.',
  },
  {
    id: 2,
    judul: 'Membaca Surat Al-Ikhlas, Al-Falaq, dan An-Nas',
    arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قُلْ هُوَ اللَّهُ أَحَدٌ... (وَالمُعَوِّذَتَيْن)',
    latin: 'Bismillahir-rahmanir-rahim. Qul huwallahu ahad... (dilanjut Al-Falaq & An-Nas).',
    arti: '“Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Katakanlah: Dialah Allah, Yang Maha Esa...”',
    ulangan: 3,
    keutamaan: 'Cukup baginya perlindungan dari segala keburukan hingga pagi hari.',
  },
  {
    id: 3,
    judul: 'Doa Masuk Waktu Sore (Petang)',
    arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    latin: 'Amsainaa wa amsal-mulku lillah, wal-hamdu lillah, laa ilaaha illallahu wahdahu laa syariika lah.',
    arti: '“Kami telah memasuki waktu sore dan kekuasaan hanya milik Allah, segala puji bagi Allah, tiada Tuhan selain Allah Yang Maha Esa tiada sekutu bagi-Nya.”',
    ulangan: 1,
    keutamaan: 'Ungkapan syukur dan pengakuan kekuasaan Allah di permulaan malam.',
  },
  {
    id: 4,
    judul: 'Sayyidul Istighfar (Petang)',
    arab: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
    latin: "Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa 'abduka...",
    arti: '“Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau...”',
    ulangan: 1,
    keutamaan: 'Barangsiapa membacanya di sore hari lalu meninggal dunia malam itu, ia masuk surga.',
  },
  {
    id: 5,
    judul: 'Dzikir Perlindungan Petang',
    arab: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillahilladzii laa yadhurru ma'asmihi syai'un fil-ardhi wa laa fis-samaa'i wahuwas-sami'ul 'aliim.",
    arti: '“Dengan nama Allah yang bersama nama-Nya tidak ada satupun yang berbahaya di bumi maupun di langit...”',
    ulangan: 3,
    keutamaan: 'Dilindungi dari segala mara bahaya hingga pagi hari.',
  },
  {
    id: 6,
    judul: 'Tasbih & Tahmid (Petang)',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    latin: "Subhaanallahi wa bihamdihi, 'adada khalqihi, wa ridhaa nafsihi, wa zinata 'arsyih...",
    arti: '“Maha Suci Allah dan segala puji bagi-Nya, sebanyak ciptaan-Nya, sejauh keridaan-Nya...”',
    ulangan: 3,
    keutamaan: 'Amalan dzikir ringan dengan ganjaran pahala yang luar biasa besar.',
  },
];
