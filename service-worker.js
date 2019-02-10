//console.log("Hello from sw");

const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './',
  './noconnection.html'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
  });

self.addEventListener('fetch', async event => {
  console.log('fetch event ' + event.request.method + ' ' + event.request.url)
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);  
    const cachedResponse = await cache.match(req); 
    //return cachedResponse || fetch(req); 
    if (cachedResponse) {
        return cachedResponse;
    }
    try {
        var reqResponse = await fetch(req);
        if (reqResponse.ok) {
            return reqResponse;    
        }    
    }
    catch(err) {
        console.log(err);
    }
    const cacheNoConnection = await cache.match("noconnection.html");
    return cacheNoConnection;
  }