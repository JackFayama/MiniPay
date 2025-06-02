const CACHE_NAME = 'minipay-cache-v1';
const urlsToCache = [
    '/',
  '/index.html',
  '/manifest.json',
  '/deposit.html',
  '/depositsuccess.html',
  '/google.jpg',
  '/mpesa.html',
  '/mpesa.png',
  '/pay.webp',
  '/pay1.jpg',
  '/paypal.png',
  '/profile.html',
  '/send (3).svg',
  '/service-worker.js',
  '/style.css', // CSS file
  '/success.html',
  '/transaction.html',
  '/transaction1.html',
  '/transaction2.html',
  '/user.svg',
  '/visa.jpg',
  '/7123945_logo_pay_google_gpay_icon.png',
];

// Install the service worker and cache required files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept fetch requests and serve cached responses when available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Optionally return a fallback page/image here
        })
      );
    })
  );
});
