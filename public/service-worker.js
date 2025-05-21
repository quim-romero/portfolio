const CACHE_NAME = 'quim-portfolio-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html',
];

// Static precache
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Clear old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[ServiceWorker] Deleting old cache:', name);
            return caches.delete(name);
          })
      )
    )
  );
});

// Improved fetch handling
self.addEventListener('fetch', (event) => {
  // Handle navigations (e.g. user visiting /projects or /about)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        console.warn('[ServiceWorker] Navigation failed, serving offline.html');
        return caches.match('/offline.html');
      })
    );
    return;
  }

  // For other requests (CSS, JS, images)
  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch(() =>
        caches.match(event.request).then((cached) => {
          return cached || caches.match('/offline.html');
        })
      )
  );
});
