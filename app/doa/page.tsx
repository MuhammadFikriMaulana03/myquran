// src/app/doa/page.tsx

import DoaListClient from './DoaListClient';

async function getDaftarDoa() {
  try {
    const res = await fetch('https://equran.id/api/doa', {
      cache: 'force-cache',
    });
    const hasil = await res.json();

    if (Array.isArray(hasil)) {
      return hasil;
    } else if (hasil && Array.isArray(hasil.data)) {
      return hasil.data;
    }
    return [];
  } catch (error) {
    console.error('Gagal mengambil data doa:', error);
    return [];
  }
}

export default async function DoaPage() {
  const daftarDoa = await getDaftarDoa();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataAman = Array.isArray(daftarDoa) ? daftarDoa : [];

  // Lempar data yang sudah diambil ke Client Component
  return <DoaListClient dataAman={dataAman} />;
}
