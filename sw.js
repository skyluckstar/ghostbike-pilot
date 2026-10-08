// Offline support: keeps the app working without internet. Data itself lives in the browser's database, not here.
const CACHE="ghostbike-pilot-v11";
const FILES=["./","./index.html","./config.js","./firebase.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
// network first (so updates arrive when online), cache as fallback when offline
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));});
