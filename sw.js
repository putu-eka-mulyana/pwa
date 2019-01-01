let CACHE_NAME = 'makan-sehat-v1';
let urlsToCache = [
    '/',
    '/js/data.json',
    '/js/main.js',
    '/css/grid.css',
    '/img/1.jpg',
    '/img/2-min.jpg',
    '/img/3-min.jpg',
    '/img/4-min.jpg',
    '/img/5-min.jpg',
    '/img/6-min.jpg',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('open cache')
            return cache.addAll(urlsToCache);
        })
    )
})
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cachesNames) {
            return Promise.all(
                cachesNames.filter(function(cachesName) {
                    return cachesName !== CACHE_NAME;
                }).map(function(cachesName) {
                    return caches.delete(cachesName)
                })
            )
        })
    )
})
self.addEventListener('fetch', function(event) {
    let request = event.request
    let url = new URL(request.url)
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(request).then(function(response) {
                return response || fetch(request)
            })
        )
    } else {
        event.respondWith(
            caches.open('makan-cache').then(function(cache) {
                return fetch(request).then(function(liveResponse) {
                    cache.put(request, liveResponse.clone())
                    return liveResponse
                }).catch(function() {
                    return caches.match(request).then(function(response) {
                        if (response) return response
                        return caches.match('/fallback.json')
                    })
                })
            })
        )
    }
})