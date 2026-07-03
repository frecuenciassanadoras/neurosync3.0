const CACHE_NAME = 'neurosync-cache-v1';
const urlsToCache = [
    './boceto.html',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // Intercepta peticiones y sirve desde cache si no hay conexión
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
