// Service worker do MapTec: rede primeiro (sempre pega a versão nova), cache como reserva offline.
const CACHE = 'maptec-v2';
const BASE = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        fetch(e.request).then(res => {
            const copia = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
            return res;
        }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
    );
});
