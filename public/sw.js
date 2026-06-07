// Beelove Farm — Service Worker
// Caches key files so the app loads fast and works offline

const CACHE_NAME = 'beelove-v1';

// Files to cache on install
const CORE_FILES = [
  './app.html',
  './manifest.json',
  './css/styles.css',
  './js/main.js',
  './images/beelove-logo.png',
  '../02_GEE_Remote_Sensing/beelove_field_collector.html',
  '../02_GEE_Remote_Sensing/beelove_suitability_map.html',
];

// ── Install: cache core files ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_FILES.filter(Boolean)))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clear old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: serve from cache, fall back to network ──
self.addEventListener('fetch', event => {
  // Skip non-GET and external requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Serve from cache immediately, update in background
        const networkFetch = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => {});
        return cached;
      }

      // Not in cache — try network, cache on success
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fully offline and not cached — return offline page
        if (event.request.destination === 'document') {
          return caches.match('./app.html');
        }
      });
    })
  );
});
