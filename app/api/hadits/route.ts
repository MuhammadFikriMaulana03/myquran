import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

let cachedHadits: any[] = [];
let cachedCounts: Record<string, number> = {};

function loadHaditsData() {
  if (cachedHadits.length > 0) return { data: cachedHadits, counts: cachedCounts };

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'hadits.csv');
    if (!fs.existsSync(filePath)) return { data: [], counts: {} };

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    cachedHadits = parsed.data;

    const counts: Record<string, number> = {};
    cachedHadits.forEach((item: any) => {
      const slug = String(item.kitab_slug || '')
        .toLowerCase()
        .trim();
      if (slug) {
        counts[slug] = (counts[slug] || 0) + 1;
      }
    });
    cachedCounts = counts;

    return { data: cachedHadits, counts: cachedCounts };
  } catch (error) {
    console.error('Gagal memparsing CSV hadits:', error);
    return { data: [], counts: {} };
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const perawi = searchParams.get('perawi') || '';

    const { data: allData, counts } = loadHaditsData();

    let filtered = allData;

    if (perawi) {
      filtered = filtered.filter((h: any) => {
        const slug = String(h.kitab_slug || '').toLowerCase();
        const namaKitab = String(h.kitab || '').toLowerCase();
        return slug.includes(perawi.toLowerCase()) || namaKitab.includes(perawi.toLowerCase());
      });
    }

    if (search) {
      filtered = filtered.filter((h: any) => {
        const arabicText = String(h.arab || '').toLowerCase();
        const transText = String(h.terjemahan_id || '').toLowerCase();
        const titleText = String(h.judul || h.title || h.bab || '').toLowerCase();
        return arabicText.includes(search) || transText.includes(search) || titleText.includes(search);
      });
    }

    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    const formattedData = paginatedData.map((item: any, idx: number) => ({
      id: startIndex + idx + 1,
      nomor: item.nomor || startIndex + idx + 1,
      perawi: item.kitab || 'Abu Dawud',
      judul: item.judul || item.title || item.bab || '', // Judul/Bab Hadis dari CSV
      arab: item.arab || '',
      terjemah: item.terjemahan_id || 'Terjemahan tidak tersedia.',
    }));

    return NextResponse.json({
      data: formattedData,
      total: filtered.length,
      grandTotal: allData.length,
      perawiCounts: counts,
      page,
      totalPages: Math.ceil(filtered.length / limit) || 1,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
