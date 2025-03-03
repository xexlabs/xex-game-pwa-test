const cacheName = "XEX-XEX-Game-0.1.25";
const contentToCache = [
    "Build/Xex Cryptogame Build-V(0.1.25) 03-03-2025.loader.js",
    "Build/Xex Cryptogame Build-V(0.1.25) 03-03-2025.framework.js",
    "Build/Xex Cryptogame Build-V(0.1.25) 03-03-2025.data",
    "Build/Xex Cryptogame Build-V(0.1.25) 03-03-2025.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
