// Service worker do MapTec: rede primeiro (sempre pega a versão nova); sem conexão, usa o cache.
// Respostas servidas do cache recebem o cabeçalho X-MapTec-Cache para o app avisar que os dados podem estar desatualizados.
const CACHE = 'maptec-v4';
const BASE = ['./', 'index.html', 'manifest.json', 'data/maptec.json', 'icon-192.png', 'icon-512.png',
    'assets/logo-tjrr-branco.png', 'assets/predios/sede.jpg', 'assets/predios/cidadania.jpg', 'assets/predios/criminal.jpg', 'assets/predios/palacio.jpg', 'assets/predios/sobral.jpg'];

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
    const url = new URL(e.request.url);
    if (url.hostname === 'api.github.com') return; // data de atualização: sempre da rede
    e.respondWith(
        fetch(e.request).then(res => {
            if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {}); }
            return res;
        }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => {
            if (!r) return caches.match('index.html');
            if (r.type === 'opaque') return r;
            const h = new Headers(r.headers); h.set('X-MapTec-Cache', '1');
            return r.blob().then(b => new Response(b, { status: r.status, statusText: r.statusText, headers: h }));
        }))
    );
});
