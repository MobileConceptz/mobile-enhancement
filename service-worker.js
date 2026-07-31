/* ===========================================
   Mobile Enhancement
   Service Worker
=========================================== */

const CACHE_NAME = "mobile-enhancement-v1";

/* Files to cache */

const FILES_TO_CACHE = [

  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./contact.vcf",
  "./install.html",

  "./logo.png",
  "./topup-qr.png",

  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon-32x32.png",
  "./favicon-16x16.png"

];

/* Install */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});

/* Activate */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/* Fetch */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);

        })

    );

});
