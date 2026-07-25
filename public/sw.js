self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Menangkap event klik pada notifikasi PWA
self.addEventListener('notificationclick', (event) => {
  // Langsung tutup notifikasinya saat diklik
  event.notification.close();

  // Jika user klik bebas (bukan tombol) atau klik tombol "Buka Aplikasi"
  if (!event.action || event.action === 'open-app') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Cek apakah tab aplikasi sudah terbuka, jika ya, fokuskan ke tab itu
        for (const client of clientList) {
          if (client.url.includes('/') && 'focus' in client) {
            return client.focus();
          }
        }
        // Jika belum ada tab yang terbuka, buka tab baru/buka PWA
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      }),
    );
  }

  // Jika action === 'close', notifikasi sudah ditutup di atas, jadi tidak perlu apa-apa lagi.
});
