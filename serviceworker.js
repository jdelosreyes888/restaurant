// Set the version number for the service worker
var staticCacheName = 'resto-3';

// Set the items to be cache
var staticCacheUrls = [
    './',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './js/app.js',
    './serviceworker.js',
    './index.html',
    './restaurant.html',
    './data/restaurants.json',
    './css/styles.css',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
  ];

// Service Worker install event
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(staticCacheUrls);
        })
    );
});

// Activate the new and updated service worker 
// Delete the old cache if found
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('resto-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// If a new service worker is found update it.
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        console.log("Trigger " + event.data.action);
        self.skipWaiting();
    }
});