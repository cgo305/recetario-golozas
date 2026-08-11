// Service worker del recetario.
//
// Objetivo: que la app abra completa sin conexión. Las recetas NO viven
// acá (están en IndexedDB); esto solo cachea los archivos de la app.
//
// Para publicar una versión nueva basta con subir el número de VERSION:
// el navegador descarta el caché viejo y trae los archivos otra vez.

const VERSION = 'golozas-v8';

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
  './fonts/glass-antiqua-latin-691d92.woff2',
  './fonts/glass-antiqua-latin-ext-558b0b.woff2',
  './fonts/great-vibes-latin-7d348a.woff2',
  './fonts/great-vibes-latin-ext-40c434.woff2',
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

  // Primero la red para TODO lo del sitio, con la copia guardada como
  // respaldo si no hay conexión.
  //
  // Antes el CSS y las fuentes se servían desde el caché primero. Eso
  // provocaba que tras publicar una versión nueva el navegador mezclara
  // el HTML recién descargado con los estilos y la tipografía viejos:
  // los iconos salían como texto y el diseño se descuadraba. El sitio
  // entero pesa poco, así que pedirlo a la red no se nota y evita de
  // raíz esa mezcla.
  const destino = req.mode === 'navigate' ? './index.html' : req;

  evento.respondWith((async () => {
    const cache = await caches.open(VERSION);
    try {
      // Si la red tarda demasiado, se responde con la copia guardada.
      const red = await Promise.race([
        fetch(req),
        new Promise((_, rechazar) => setTimeout(() => rechazar(new Error('lenta')), 4000))
      ]);
      if (red && red.ok) cache.put(destino, red.clone());
      return red;
    } catch (e) {
      const guardado = await cache.match(destino);
      return guardado || Response.error();
    }
  })());
});
