
const cacheName = 'ginkoBus-v1';

const appShellFiles = [
  'index.html',
  'style.css',
  'app.js',
  'icon-32.png',
  'icon-64.png',
  'icon-96.png',
  'icon-128.png',
  'icon-168.png',
  'icon-180.png',
  'icon-192.png',
  'icon-256.png',
  'icon-512.png',
  'maskable_icon.png',
];


self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(appShellFiles);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});