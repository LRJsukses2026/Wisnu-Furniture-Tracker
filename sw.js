/* Service worker Gudang Wisnu: menyimpan file aplikasi di HP agar cepat dibuka dan tetap jalan tanpa internet. */
var CACHE = 'gudang-wisnu-v3';
var SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);

  if (u.origin === location.origin) {
    // Halaman utama: coba jaringan dulu (agar versi baru langsung terpakai), cadangan dari cache
    if (r.mode === 'navigate') {
      e.respondWith(
        fetch(r).then(function (res) {
          var cp = res.clone();
          caches.open(CACHE).then(function (c) { c.put('index.html', cp); });
          return res;
        }).catch(function () { return caches.match('index.html'); })
      );
      return;
    }
    // File lain (ikon, manifest): cache dulu
    e.respondWith(
      caches.match(r).then(function (hit) {
        return hit || fetch(r).then(function (res) {
          var cp = res.clone();
          caches.open(CACHE).then(function (c) { c.put(r, cp); });
          return res;
        });
      })
    );
    return;
  }

  // Font Google: pakai cache, perbarui di belakang layar
  if (u.hostname.indexOf('fonts.g') === 0) {
    e.respondWith(
      caches.open(CACHE).then(function (c) {
        return c.match(r).then(function (hit) {
          var net = fetch(r).then(function (res) { c.put(r, res.clone()); return res; }).catch(function () { return hit; });
          return hit || net;
        });
      })
    );
  }
});
