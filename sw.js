// ===== MonStock Pro — Service Worker =====
const CACHE_NAME = 'monstock-pro-v1';
const URLS_TO_CACHE = [
  './Vpro.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installation : mise en cache des fichiers essentiels
self.addEventListener('install', function(event) {
  console.log('[MonStock SW] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[MonStock SW] Mise en cache des fichiers');
      return cache.addAll(URLS_TO_CACHE.map(url => {
        return new Request(url, { cache: 'reload' });
      })).catch(function(err) {
        console.warn('[MonStock SW] Certains fichiers non cachés :', err);
      });
    })
  );
  self.skipWaiting();
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', function(event) {
  console.log('[MonStock SW] Activation...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          console.log('[MonStock SW] Suppression ancien cache :', name);
          return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch : stratégie Cache First (hors-ligne prioritaire)
self.addEventListener('fetch', function(event) {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;
  // Ignorer les requêtes chrome-extension et autres schémas non-http
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        // Fichier trouvé en cache → retourner immédiatement
        return cachedResponse;
      }
      // Pas en cache → requête réseau
      return fetch(event.request).then(function(networkResponse) {
        // Mettre en cache la réponse pour la prochaine fois
        if (networkResponse && networkResponse.status === 200) {
          var responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(function() {
        // Hors-ligne et pas en cache : page de fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./Vpro.html');
        }
      });
    })
  );
});

// Message pour forcer la mise à jour du cache
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
