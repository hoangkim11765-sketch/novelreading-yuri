// shortcut: lưu sẵn cả app để mở khi mất mạng; mỗi lần cập nhật index.html thì đổi v1 -> v2 để máy tải bản mới
const C = 'novelreading-yuri-v1';
self.addEventListener('install', e => e.waitUntil(
  caches.open(C).then(c => c.addAll(['./', 'index.html', 'manifest.json', 'icon-192.png',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'])).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
