// Beelove Farm — Service Worker (DISABLED)
// This file remains only to unregister the old prototype service worker,
// which was caching stale static files and breaking the live React app.
// It clears all caches and unregisters itself, then forces clients to reload.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete every cache this origin created.
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      // Unregister this service worker.
      await self.registration.unregister();

      // Reload any pages currently controlled by this worker so they
      // fetch fresh assets straight from the network.
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});

// Never intercept requests — always go to the network.
self.addEventListener('fetch', () => {});
