const CACHE_NAME = 'kedaisegar-1';
var urlsToCache = [
	"/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/menu.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/manifest.json",
  "/img/wa.png",
  "/img/instagram1.png",
  "/img/shop.png",
  "/img/instagram1.png",
  "/img/toko.png",
  "/img/esbuah.png",
  "/img/escampur.png",
  "/img/juice.png",
  "/img/salad.png",
  "/img/kedai.png",
  "/img/android-icon-144x144.png",
  "/img/android-icon-192x192.png",
  "/img/android-icon-96x96.png"
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener("activate",function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames){
			return Promise.all(
				cacheNames.map(function(cacheName){
					if (cacheName != CACHE_NAME){
						console.log("SeviceWorker: cache"+cacheName+"dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

