// public/sw.js

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Menangkap event push / trigger notifikasi
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Waktu Sholat Telah Tiba 🕌';
  const options = {
    body: data.body || 'Mari segera bersiap untuk menunaikan ibadah sholat.',
    icon: '/icon.png',
    badge: '/icon.png',
    vibrate: [300, 100, 300],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Ketika notifikasi diklik oleh pengguna di HP
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
