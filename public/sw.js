// Service Worker for TaskFlow PWA
const CACHE_NAME = 'taskflow-v1.2'; // Version bump to force update

// Add a skipWaiting flag to ensure updates are applied immediately
self.addEventListener('install', (event) => {
  // Forces the waiting service worker to become the active service worker
  self.skipWaiting();
  console.log('Service Worker: Installed');
});

// Claim control of the page immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  console.log('Service Worker: Activated');
});

// Core assets that are critical for the app to function
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/styles/global.css',
  '/app.js',
  '/favicon.ico',
  '/favicon.svg'
];

// Cache name for the current version
const CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + CACHE_NAME
};

// Optional assets that are nice to have but not critical
const OPTIONAL_ASSETS = [
  '/favicon.ico',
  '/favicon.svg'
];

// Install event - cache core assets first, then try optional ones
self.addEventListener('install', (event) => {
  // Ensure the service worker doesn't wait for the page to close to activate
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching core assets');
        // First cache core assets
        return cache.addAll(CORE_ASSETS)
          .then(() => {
            console.log('Core assets cached');
            // Then try to cache optional assets
            return Promise.all(
              OPTIONAL_ASSETS.map(asset => {
                return fetch(asset, { credentials: 'same-origin' })
                  .then(response => {
                    if (response.ok) {
                      return cache.put(asset, response);
                    }
                    return Promise.resolve();
                  })
                  .catch(err => {
                    console.warn(`Optional asset ${asset} not cached:`, err.message);
                    return Promise.resolve();
                  });
              })
            );
          });
      })
      .catch(error => {
        console.error('Cache initialization failed:', error);
        throw error; // This will make the installation fail
      })
  );
  // Activate the new service worker immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and non-http(s) requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests, try the network first, then cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => cacheNetworkResponse(event.request, response))
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found and valid
        if (cachedResponse) {
          // If we have a cached response, also update it in the background
          fetchAndCache(event.request);
          return cachedResponse;
        }
        
        // Otherwise, try the network
        return fetchAndCache(event.request);
      })
  );
});

// Helper function to fetch and cache a response
function fetchAndCache(request) {
  return fetch(request)
    .then(response => {
      // Check if we received a valid response
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
      
      // Clone the response
      const responseToCache = response.clone();
      
      // Cache the response for future use
      caches.open(CACHE_NAME)
        .then(cache => cache.put(request, responseToCache))
        .catch(error => console.warn('Failed to cache response:', error));
      
      return response;
    })
    .catch(error => {
      console.error('Fetch failed:', error);
      // For API requests, you might want to return a custom offline response
      if (request.url.includes('/api/')) {
        return new Response(JSON.stringify({ error: 'You are offline' }), {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'application/json' }
        });
      }
      throw error;
    });
}

// Helper function to cache a network response
function cacheNetworkResponse(request, response) {
  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response;
  }
  
  // Clone the response
  const responseToCache = response.clone();
  
  caches.open(CACHE_NAME)
    .then(cache => cache.put(request, responseToCache))
    .catch(error => console.warn('Failed to cache response:', error));
  
  return response;
}
