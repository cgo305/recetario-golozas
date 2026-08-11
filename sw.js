// Service worker del recetario.
//
// Objetivo: que la app abra completa sin conexión. Las recetas NO viven
// acá (están en IndexedDB); esto solo cachea los archivos de la app.
//
// Para publicar una versión nueva basta con subir el número de VERSION:
// el navegador descarta el caché viejo y trae los archivos otra vez.

const VERSION = 'golozas-v5';

const ARCHIVOS = [
  './',
  './index.html',
  './app.css',
  './fonts.css',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './fonts/lora-latin-5989f6.woff2',
  './fonts/lora-latin-831a90.woff2',
  './fonts/lora-latin-ext-2b409e.woff2',
  './fonts/lora-latin-ext-80ef2e.woff2',
  './fonts/material-symbols-subset.woff2'
];

// Instalación: se guardan los archivos base.
self.addEventListener('install', (evento) => {
  evento.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // addAll falla entero si un archivo falta; se agregan de a uno para
    // que un recurso opcional no impida la instalación.
    await Promise.all(ARCHIVOS.map(async (url) => {
      try { await cache.add(new Request(url, { cache: 'reload' })); }
      catch (e) { console.warn('No se pudo cachear', url, e); }
    }));
    self.skipWaiting();
  })());
});

// Activación: se borran los cachés de versiones anteriores.
self.addEventListener('activate', (evento) => {
  evento.waitUntil((async () => {
    const nombres = await caches.keys();
    await Promise.all(nombres.filter(n => n !== VERSION).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (evento) => {
  const req = evento.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // nada externo que servir

  // La página: primero la red, para recibir actualizaciones; si no hay
  // conexión, se sirve la copia guardada.
  if (req.mode === 'navigate') {
    evento.respondWith((async () => {
      try {
        const red = await fetch(req);
        const cache = await caches.open(VERSION);
        cache.put('./index.html', red.clone());
        return red;
      } catch (e) {
        const cache = await caches.open(VERSION);
        return (await cache.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // El resto (CSS, fuentes, iconos): primero el caché, que es lo rápido,
  // y se refresca por detrás.
  evento.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const guardado = await cache.match(req);
    if (guardado) {
      fetch(req).then(r => { if (r && r.ok) cache.put(req, r); }).catch(() => {});
      return guardado;
    }
    try {
      const red = await fetch(req);
      if (red && red.ok) cache.put(req, red.clone());
      return red;
    } catch (e) {
      return Response.error();
    }
  })());
});
