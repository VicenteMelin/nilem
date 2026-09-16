// Service worker · Plan 2027
// Estrategia: el HTML va siempre a red primero, así cada push se ve al instante;
// si no hay red, se sirve la copia en caché. Íconos, manifest y fuentes de Google
// se sirven desde caché y se refrescan en segundo plano.
// Subir la versión del CACHE invalida todo lo guardado.
const CACHE="plan2027-v1";
const SHELL=["./index.html","./manifest.json","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET")return;
  const esHTML=req.mode==="navigate"||(req.headers.get("accept")||"").includes("text/html");

  if(esHTML){
    e.respondWith(
      fetch(req).then(res=>{
        const copia=res.clone();
        caches.open(CACHE).then(c=>c.put("./index.html",copia));
        return res;
      }).catch(()=>caches.match("./index.html"))
    );
    return;
  }

  e.respondWith(caches.open(CACHE).then(async c=>{
    const enCache=await c.match(req);
    const red=fetch(req).then(res=>{
      if(res.ok||res.type==="opaque")c.put(req,res.clone());
      return res;
    }).catch(()=>enCache);
    return enCache||red;
  }));
});
