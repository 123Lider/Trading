const CACHE_NAME = "tournament-cache-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => cached);
    })
  );
});
