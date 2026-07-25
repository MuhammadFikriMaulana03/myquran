// src/app/hadits/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

const daftarHadits = [
  {
    id: 1,
    judul: 'Niat dan Keikhlasan Amal',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    latin: "Innamal a'malu bin-niyyati wa innamaa likullimri'in maa nawaa.",
    arti: 'Sesungguhnya segala amal itu tergantung niatnya, dan sesungguhnya bagi setiap orang apa yang ia niatkan.',
  },
  {
    id: 2,
    judul: 'Keutamaan Belajar & Mengajar Al-Quran',
    perawi: 'HR. Bukhari',
    kategori: 'Bukhari',
    arab: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    latin: "Khairukum man ta'allamal-qur'ana wa 'allamahu.",
    arti: 'Sebaik-baik kalian adalah orang yang mempelajari Al-Quran dan mengajarkannya.',
  },
  {
    id: 3,
    judul: 'Berbicara Baik atau Diam',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    latin: "Man kana yu'minu billahi wal-yawmil-akhiri falyaqul khairan aw liyashmut.",
    arti: 'Barangsiapa yang beriman kepada Allah dan Hari Akhir, maka hendaklah ia berkata baik atau diam.',
  },
  {
    id: 4,
    judul: 'Keutamaan Sifat Malu',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'الْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ',
    latin: "Al-haya'u syu'batun minal-iman.",
    arti: 'Malu adalah salah satu cabang dari iman.',
  },
  {
    id: 5,
    judul: 'Mencintai Saudara Seperti Diri Sendiri',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبُّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    latin: "La yu'minu ahadukum hatta yuhibba li'akhihi ma yuhibbu linafsih.",
    arti: 'Tidak beriman salah seorang di antara kalian hingga ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.',
  },
  {
    id: 6,
    judul: 'Senyuman adalah Sedekah',
    perawi: 'HR. Tirmidzi',
    kategori: 'Tirmidzi',
    arab: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ',
    latin: 'Tabassumuka fi wajhi akhika sadaqah.',
    arti: 'Senyummu di hadapan saudaramu adalah sedekah bagimu.',
  },
  {
    id: 7,
    judul: 'Kebersihan Sebagian dari Iman',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
    latin: 'At-tahuru syathrul iman.',
    arti: 'Kesucian (kebersihan) adalah separuh dari iman.',
  },
  {
    id: 8,
    judul: 'Keutamaan Menuntut Ilmu',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
    latin: 'Man salaka thariqan yaltamisu fihi ilman sahalallahu lahu bihi thariqan ilal-jannah.',
    arti: 'Barangsiapa menempuh suatu jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga.',
  },
  {
    id: 9,
    judul: 'Keutamaan Menahan Marah',
    perawi: 'HR. Bukhari',
    kategori: 'Bukhari',
    arab: 'لَا تَغْضَبْ وَلَكَ الْجَنَّةُ',
    latin: 'La taghdhab wa lakal-jannah.',
    arti: 'Janganlah kamu marah, maka bagimu surga.',
  },
  {
    id: 10,
    judul: 'Kekuatan Doa',
    perawi: 'HR. Tirmidzi',
    kategori: 'Tirmidzi',
    arab: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',
    latin: "Ad-du'a huwal-ibadah.",
    arti: 'Doa adalah inti dari ibadah.',
  },
  {
    id: 11,
    judul: 'Menjaga Lisan dan Kemaluan',
    perawi: 'HR. Tirmidzi',
    kategori: 'Tirmidzi',
    arab: 'مَنْ وَقَاهُ اللَّهُ شَرَّ مَا بَيْنَ لَحْيَيْهِ وَشَرَّ مَا بَيْنَ رِجْلَيْهِ دَخَلَ الْجَنَّةَ',
    latin: 'Man waqahullahu syarra ma baina lahyaihi wa syarra ma baina rijlaihi dakhalal-jannah.',
    arti: 'Barangsiapa yang diselamatkan Allah dari kejahatan yang ada di antara dua rahangnya (lisan) dan kejahatan di antara kedua kakinya (kemaluan), maka ia akan masuk surga.',
  },
  {
    id: 12,
    judul: 'Kasih Sayang Antar Sesama',
    perawi: 'HR. Tirmidzi',
    kategori: 'Tirmidzi',
    arab: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
    latin: "Ar-rahimuna yarhamuhumur-rahman, irhamu man fil-ardhi yarhamkum man fis-sama'.",
    arti: 'Orang-orang yang penyayang akan disayangi oleh Allah Yang Maha Penyayang. Sayangilah penduduk bumi, niscaya Zat yang di langit akan menyayangi kalian.',
  },
  {
    id: 13,
    judul: 'Memuliakan Tetangga dan Tamu',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
    latin: "Man kana yu'minu billahi wal-yawmil-akhiri falyukrim jarahu, wa man kana yu'minu billahi wal-yawmil-akhiri falyukrim daifahu.",
    arti: 'Barangsiapa beriman kepada Allah dan Hari Akhir, hendaklah ia memuliakan tetangganya. Dan barangsiapa beriman kepada Allah dan Hari Akhir, hendaklah ia memuliakan tamunya.',
  },
  {
    id: 14,
    judul: 'Larangan Berburuk Sangka',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'إِيَّاكُمْ وَالظَّنَّ فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ',
    latin: "Iyyakum waz-zhanna fa'innaz-zhanna akdhabul-hadits.",
    arti: 'Berhati-hatilah kalian dari prasangka buruk, karena prasangka buruk adalah perkataan yang paling dusta.',
  },
  {
    id: 15,
    judul: 'Keutamaan Sholat Berjamaah',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً',
    latin: "Salatul-jama'ati tafdhalu salatal-faddhi bisab'in wa 'isyrina darajatan.",
    arti: 'Sholat berjamaah lebih utama 27 derajat daripada sholat sendirian.',
  },
  {
    id: 16,
    judul: 'Keutamaan Membaca Istighfar',
    perawi: 'HR. Abu Dawud',
    kategori: 'Abu Dawud',
    arab: 'مَنْ لَزِمَ الِاسْتِغْفَارَ جَعَلَ اللَّهُ لَهُ مِنْ كُلِّ ضِيقٍ مَخْرَجًا، وَمِنْ كُلِّ هَمٍّ فَرَجًا',
    latin: "Man lazimal-istighfara ja'alallahu lahu min kulli dhiiqin makhrajan, wa min kulli hammin faraja.",
    arti: 'Barangsiapa yang istiqomah beristighfar, niscaya Allah memberikan jalan keluar bagi setiap kesempitannya dan kelapangan bagi setiap kesusahannya.',
  },
  {
    id: 17,
    judul: 'Adab Makan Menggunakan Tangan Kanan',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'يَا غُلَامُ، سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ',
    latin: 'Ya ghulamu, sammillaha, wa kul biyaminika, wa kul mimma yalik.',
    arti: 'Wahai anak, sebutlah nama Allah (baca Bismillah), makanlah dengan tangan kananmu, dan makanlah apa yang ada di dekatmu.',
  },
  {
    id: 18,
    judul: 'Keutamaan Menyambung Silaturahmi',
    perawi: 'HR. Bukhari',
    kategori: 'Bukhari',
    arab: 'مَنْ أَحَبَّ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ، وَيُنْسَأَ لَهُ فِي أَثَرِهِ، فَلْيَصِلْ رَحِمَهُ',
    latin: "Man ahabba an yubsatha lahu fi rizqihi, wa yuns'a lahu fi atsarihi, falyashil rahimah.",
    arti: 'Barangsiapa yang ingin diluaskan rezekinya dan dipanjangkan umurnya (bekas peninggalan kebaikannya), maka hendaklah ia menyambung silaturahmi.',
  },
  {
    id: 19,
    judul: 'Sedekah Menghapus Kesalahan',
    perawi: 'HR. Tirmidzi',
    kategori: 'Tirmidzi',
    arab: 'وَالصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ',
    latin: "Was-shadaqatu tuthfi'ul-khathi'ata kama yuthfi'ul-ma'u an-nar.",
    arti: 'Dan sedekah dapat menghapuskan kesalahan (dosa) sebagaimana air memadamkan api.',
  },
  {
    id: 20,
    judul: 'Mencari Rezeki yang Halal',
    perawi: 'HR. Thabrani',
    kategori: 'Lainnya',
    arab: 'طَلَبُ الْحَلَالِ وَاجِبٌ عَلَى كُلِّ مُسْلِمٍ',
    latin: "Thalabul-halali wajibun 'ala kulli muslim.",
    arti: 'Mencari rezeki yang halal adalah kewajiban bagi setiap Muslim.',
  },
  {
    id: 21,
    judul: 'Berbakti kepada Kedua Orang Tua',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'رِضَا الرَّبِّ فِي رِضَا الْوَالِدَيْنِ، وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدَيْنِ',
    latin: 'Ridar-rabbi fi ridal-walidaini, wa sakhatur-rabbi fi sakhatil-walidain.',
    arti: 'Keridaan Tuhan terletak pada keridaan kedua orang tua, dan kemurkaan Tuhan terletak pada kemurkaan kedua orang tua.',
  },
  {
    id: 22,
    judul: 'Keutamaan Sholat Malam (Tahajud)',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'أَفْضَلُ الصَّلَاةِ بَعْدَ الصَّلَاةِ الْمَكْتُوبَةِ صَلَاةُ اللَّيْلِ',
    latin: "Afdhalus-shalati ba'das-shalatil-maktubati salatul-lail.",
    arti: 'Sebaik-baik sholat setelah sholat fardhu adalah sholat malam (tahajud).',
  },
  {
    id: 23,
    judul: 'Larangan Saling Mendengki',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'وَلَا تَحَاسَدُوا، وَلَا تَبَاغَضُوا، وَلَا تَدَابَرُوا، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا',
    latin: "Wa la tahasadu, wa la taba-ghadu, wa la tadabaru, wa kunu 'ibadallahi ikhwanan.",
    arti: 'Janganlah kalian saling mendengki, saling membenci, saling membelakangi, dan jadilah kalian hamba-hamba Allah yang bersaudara.',
  },
  {
    id: 24,
    judul: 'Keutamaan Membaca Ayat Kursi',
    perawi: "HR. An-Nasa'i",
    kategori: "An-Nasa'i",
    arab: 'مَنْ قَرَأَ آيَةَ الْكُرْسِيِّ دُبُرَ كُلِّ صَلَاةٍ مَكْتُوبَةٍ لَمْ يَمْنَعْهُمْ مِنْ دُخُولِ الْجَنَّةِ إِلَّا أَنْ يَمُوتَ',
    latin: "Man qara'a ayatal-kursiyyi dubura kulli shalatin maktubatin lam yamna'hum min dukhulil-jannati illa an yamuta.",
    arti: 'Barangsiapa membaca Ayat Kursi setiap selesai sholat fardhu, maka tidak ada yang menghalanginya masuk surga kecuali kematian.',
  },
  {
    id: 25,
    judul: 'Keutamaan Sholat Tepat Pada Waktunya',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ الصَّلَاةُ لِوَقْتِهَا',
    latin: "Ahabbul-a'mali ilallahi ash-shalatu liwaqtiha.",
    arti: 'Amalan yang paling dicintai oleh Allah adalah sholat pada waktunya.',
  },
  {
    id: 26,
    judul: 'Menjaga Amanah',
    perawi: 'HR. Bukhari',
    kategori: 'Bukhari',
    arab: 'آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ',
    latin: "Ayatul-munafiqi thalatsun: idza hadatsa kadzaba, wa idza wa'ada akhlafa, wa idza u'tumina khana.",
    arti: 'Tanda-tanda orang munafik itu ada tiga: jika berbicara ia berdusta, jika berjanji ia mengingkari, dan jika dipercaya ia berkhianat.',
  },
  {
    id: 27,
    judul: 'Berbuat Baik kepada Hewan',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ',
    latin: 'Fi kulli kabidin rathbatin ajrun.',
    arti: 'Pada setiap makhluk yang bernyawa (yang hatinya basah) terdapat pahala (dalam berbuat baik kepadanya).',
  },
  {
    id: 28,
    judul: 'Keutamaan Memberi Salam',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا، وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا، أَوَلَا أَدُلُّكُمْ عَلَى شَيْءٍ إِذَا فَعَلْتُمُوهُ تَحَابَبْتُمْ؟ أَفْشُوا السَّلَامَ بَيْنَكُمْ',
    latin: "La tadkhulunal-jannata hatta tu'minu, wa la tu'minu hatta tahabbu, awala adullukum 'ala syai'in idza fa'altumuhu tahababtum? Afsyus-salama bainakum.",
    arti: 'Kalian tidak akan masuk surga hingga kalian beriman, dan kalian tidak beriman secara sempurna sebelum kalian saling mencintai. Maukah kalian aku tunjukkan sesuatu yang jika kalian lakukan kalian akan saling mencintai? Sebarkanlah salam di antara kalian.',
  },
  {
    id: 29,
    judul: 'Keutamaan Membaca Surah Al-Kahfi pada Hari Jumat',
    perawi: 'HR. Hakim & Baihaqi',
    kategori: 'Lainnya',
    arab: 'مَنْ قَرَأَ سُورَةَ الْكَهْفِ فِي يَوْمِ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ مَا بَيْنَ الْجُمُعَتَيْنِ',
    latin: "Man qara'a suratal-kahfi fi yawmil-jum'ati adha'a lahu minan-nuri ma bainal-jum'atain.",
    arti: 'Barangsiapa membaca Surah Al-Kahfi pada hari Jumat, maka ia akan disinari cahaya di antara dua Jumat.',
  },
  {
    id: 30,
    judul: 'Keutamaan Sholat Sunnah Rawatib Qabliyah Subuh',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا',
    latin: "Rark'atal-fajri khairun minad-dunya wa ma fiha.",
    arti: 'Dua rakaat sholat fajar (sunnah subuh) lebih baik daripada dunia dan seisinya.',
  },
  {
    id: 31,
    judul: 'Larangan Mengambil Hak Orang Lain (Zhalim)',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'اتَّقُوا الظُّلْمَ فَإِنَّ الظُّلْمَ ظُلُمَاتٌ يَوْمَ الْقِيَامَةِ',
    latin: "Ittaquz-zhulma fa'innaz-zhulma zhulumatun yawmal-qiyamah.",
    arti: 'Takutlah kalian terhadap kezhaliman, karena kezhaliman adalah kegelapan pada hari kiamat.',
  },
  {
    id: 32,
    judul: 'Anjuran Berbuat Lemah Lembut',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ',
    latin: "Innar-rifqa la yakunu fi syai'in illa zanahu, wa la yunza'u min syai'in illa syanahu.",
    arti: 'Sesungguhnya kelembutan tidaklah ada pada sesuatu melainkan ia akan menghiasinya, dan tidaklah dicabut dari sesuatu melainkan ia akan memperburuknya.',
  },
  {
    id: 33,
    judul: 'Keutamaan Memberi Makan Orang Lain',
    perawi: 'HR. Tirmidzi & Ibnu Majah',
    kategori: 'Tirmidzi',
    arab: 'أَفْشُوا السَّلَامَ، وَأَطْعِمُوا الطَّعَامَ، وَصَلُّوا بِاللَّيْلِ وَالنَّاسُ نِيَامٌ، تَدْخُلُوا الْجَنَّةَ بِسَلَامٍ',
    latin: "Afsyus-salama, wa ath'imuth-tha'ama, wa sallu bil-laili wan-nasu niyamun, tadkhulul-jannata bisalamin.",
    arti: 'Sebarkanlah salam, berikanlah makanan, dan sholat malamlah pada saat manusia sedang tidur, niscaya kalian akan masuk surga dengan selamat.',
  },
  {
    id: 34,
    judul: 'Keutamaan Sholat Dhuha',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'يُصْبِحُ عَلى كُلِّ سُلامى مِنْ أَحَدِكُمْ صَدَقَةٌ...',
    latin: "Yushbihu 'ala kulli sulamin min ahadikum sadaqah...",
    arti: 'Setiap sendi dari anggota tubuh kalian wajib dikeluarkan sedekahnya setiap pagi... dan mencukupi hal tersebut adalah dua rakaat sholat Dhuha.',
  },
  {
    id: 35,
    judul: 'Pentingnya Menjaga Waktu',
    perawi: 'HR. Tirmidzi',
    kategori: 'Tirmidzi',
    arab: 'نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ',
    latin: "Ni'matani maghbunun fihima katsirun minan-nas: ash-shihhatu wal-faragh.",
    arti: 'Ada dua nikmat yang banyak manusia tertipu (rugi) pada keduanya: nikmat sehat dan nikmat waktu luang.',
  },
  {
    id: 36,
    judul: 'Keutamaan Dzikir Pagi dan Petang (Tasbih & Tahmid)',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ',
    latin: "Man qara'a: subhanallahi wa bihamdihi fi yaumin mi'atan marratan, huththat khathayahu wa in kanat mitsla zabadil-bahr.",
    arti: "Barangsiapa membaca 'Subhanallahi wa bihamdihi' dalam sehari sebanyak 100 kali, maka kesalahan-kesalahannya akan diampuni meskipun sebanyak buih di lautan.",
  },
  {
    id: 37,
    judul: 'Larangan Marah dan Balasan Surga',
    perawi: 'HR. Thabrani',
    kategori: 'Lainnya',
    arab: 'لَا تَغْضَبْ وَلَكَ الْجَنَّةُ',
    latin: 'La taghdhab wa lakal-jannah.',
    arti: 'Janganlah kamu marah, niscaya bagimu surga.',
  },
  {
    id: 38,
    judul: 'Anjuran Menjenguk Orang Sakit',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'مَنْ عَادَ مَرِيضًا أَوْ زَارَ أَخًا لَهُ فِي اللَّهِ نَادَاهُ مُنَادٍ: أَنْ طِبْتَ وَطَابَ مَمْشَاكَ وَتبَوَّأْتَ مِنَ الْجَنَّةِ مَنْزِلًا',
    latin: "Man 'ada maridhan aw zara akhan lahu fiillahi nada-hu munadin: an thibta wa thaba mamsyaka wa tabawwa'ta minal-jannati manzila.",
    arti: "Barangsiapa menjenguk orang sakit atau mengunjungi saudaranya karena Allah, penyeru akan memanggil: 'Alangkah baiknya engkau, bagus pula langkahmu, dan engkau telah menempati sebuah tempat tinggal di surga.'",
  },
  {
    id: 39,
    judul: 'Keutamaan Menutupi Aib Saudara',
    perawi: 'HR. Muslim',
    kategori: 'Muslim',
    arab: 'وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالْآخِرَةِ',
    latin: 'Wa man satara musliman satarahullahu fid-dunya wal-akhirah.',
    arti: 'Dan barangsiapa menutupi aib seorang Muslim, maka Allah akan menutupi aibnya di dunia dan di akhirat.',
  },
  {
    id: 40,
    judul: 'Pentingnya Sifat Jujur',
    perawi: 'HR. Bukhari & Muslim',
    kategori: 'Bukhari & Muslim',
    arab: 'إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ',
    latin: 'Innas-sidqa yahdi ilal-birri, wa innal-birra yahdi ilal-jannah.',
    arti: 'Sesungguhnya kejujuran itu membimbing kepada kebaikan, dan kebaikan itu membimbing ke surga.',
  },
];

const categories = ['Semua', 'Bukhari', 'Muslim', 'Bukhari & Muslim', 'Tirmidzi', 'Abu Dawud', "An-Nasa'i", 'Lainnya'];

export default function HaditsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [visibleCount, setVisibleCount] = useState(10); // Sistem Load More / Pagination agar performa tetap ringan

  const filteredHadits = daftarHadits.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchSearch = item.judul.toLowerCase().includes(q) || item.arti.toLowerCase().includes(q) || item.latin.toLowerCase().includes(q) || item.perawi.toLowerCase().includes(q);

    const matchCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;

    return matchSearch && matchCategory;
  });

  const displayedHadits = filteredHadits.slice(0, visibleCount);

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-slate-50 text-slate-800">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6 mt-4">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition-all font-medium">
          <span>←</span> Kembali ke Beranda
        </Link>
      </div>

      {/* Header Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-2">Hadits Pilihan</h1>
        <p className="text-slate-500">Kumpulan mutiara hadits Nabi Muhammad SAW penyejuk hati</p>
      </div>

      {/* Kotak Pencarian */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center w-full bg-white p-2 rounded-2xl shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
          <span className="pl-3 pr-2 text-slate-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(10);
            }}
            placeholder="Cari hadits (misal: niat, sholat, sedekah)..."
            className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 text-sm outline-none px-2 py-2 w-full"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="px-3 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Kategori Perawi */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(10);
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
            }`}
          >
            {cat === 'Semua' ? '🌟 Semua Hadits' : cat === 'Lainnya' ? '📚 Lainnya' : `HR. ${cat}`}
          </button>
        ))}
      </div>

      {/* Daftar Hadits */}
      <div className="space-y-6">
        {displayedHadits.length > 0 ? (
          <>
            {displayedHadits.map((item) => (
              <div key={item.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-emerald-800">{item.judul}</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{item.perawi}</span>
                </div>

                {/* Teks Arab */}
                <p className="text-2xl md:text-3xl text-slate-800 font-serif leading-[2.5] text-right mb-4" dir="rtl">
                  {item.arab}
                </p>

                {/* Teks Latin & Artinya */}
                <div className="space-y-2 pt-3 border-t border-slate-50">
                  <p className="text-emerald-700 italic text-sm md:text-base font-medium">{item.latin}</p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.arti}</p>
                </div>
              </div>
            ))}

            {/* Tombol Muat Lebih Banyak (Load More) */}
            {visibleCount < filteredHadits.length && (
              <div className="text-center pt-6">
                <button onClick={() => setVisibleCount((prev) => prev + 10)} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-sm">
                  Muat Lebih Banyak ({filteredHadits.length - visibleCount} tersisa)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-slate-100 text-slate-500">
            <p className="text-lg font-semibold mb-1">Hadits tidak ditemukan</p>
            <p className="text-sm text-slate-400">Coba pilih kategori lain atau ubah kata kunci pencarian.</p>
          </div>
        )}
      </div>
    </main>
  );
}
