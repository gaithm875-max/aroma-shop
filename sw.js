const CACHE_NAME = 'aroma-cache-v2';
const OFFLINE_URL = '/index.html';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([OFFLINE_URL])).catch(() => {})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Network-first: try network then fallback to cache
  event.respondWith(
    fetch(req).then(networkResponse => {
      try {
        const copy = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
      } catch (e) {}
      return networkResponse;
    }).catch(() => {
      return caches.match(req).then(cached => cached || caches.match(OFFLINE_URL));
    })
  );
});
