importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');

self.__precacheManifest = [].concat(self.__precacheManifest || []);

var _variables = ['canui'];
var CACHE_NAME_STATIC = `pwa-cache-static-${_variables[0]}-v1`;
var CACHE_NAME_DYNAMIC = `pwa-cache-dynamic-${_variables[0]}-v1`;
var store = `PostResponses-${_variables[0]}-v1`;
var urlsdynamic = [
	'offline.html', 
	'index.html',
];
var urlsToCache = [
	'/index.html',
	'/css/style.css',
	'/css/colors/red-customize.css',
	'/css/custom.css',
	'/js/jquery-3.5.1.min.js',
	'/js/jquery-migrate-3.3.1.min.js',
	'/js/tippy.all.min.js',
	'/js/simplebar.min.js',
	'/js/bootstrap-slider.min.js',
	'/js/bootstrap-select.min.js',
	'/js/mmenu.min.js',
	'/js/snackbar.js',
	'/js/clipboard.min.js',
	'/js/counterup.min.js',
	'/js/magnific-popup.min.js',
	'/js/slick.min.js',
	'/js/custom.js',
	'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js',
];

PreCacheHanlde(self.__precacheManifest);

/*function PreCacheDynamic (_list) {
	try{
		var _urlCur = `${_pathUrl}${_variables[0]}/${_variables[1]}/`;
		for (var i = 0; i < _list.length; i++) {
			var _inListVal = `${_urlCur}${_list[i]}`;
			if(urlsToCache.indexOf(_inListVal) === -1){
				urlsToCache.push(_inListVal);
			}
		}
	}catch(err){
		console.log(err);
	}	
}*/
function PreCacheHanlde (_list) {
	var _listNoCache = ['static'];
	try{
		for (var i = 0; i < _list.length; i++) {
			for (var j = 0; j < _listNoCache.length; j++) {
				if(_list[i].url && _list[i].url.indexOf(_listNoCache[j]) > -1){
					if(urlsToCache.indexOf(_list[i].url) === -1){
						urlsToCache.push(_list[i].url);
					}
				}
			}
		}
	}catch(err){
		console.log(err);
	}	
}

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME_DYNAMIC)
			.then(function(cache) {
				// Open a cache and cache our files
				return cache.addAll(urlsToCache);
			})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

// Return cached response when possible, and fetch new results from server in
// the background and update the cache.
self.addEventListener('fetch', async (event) => {
	if (event.request.method === 'POST') {
		event.respondWith(staleWhileRevalidate(event));
	}else if(event.request.method === 'GET'){
		event.respondWith(
			caches.open(CACHE_NAME_DYNAMIC).then(function(cache) {
				return cache.match(event.request).then(function(response) {
					let fetchPromise = fetch(event.request).catch((err) => {
						console.log(err);
					}).then((networkResponse) =>  {
						try{
							cache.put(event.request.url + '&canui', networkResponse.clone());
						}catch(err){}
						
						return networkResponse;
					})
					return response || fetchPromise;
				})
			})
		)
	}
});

// push notification
self.addEventListener('push', (event) => {
	console.log(event);
	console.log(clients);
	console.log('[Service Worker] Push Received.');
	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

	if (!(self.Notification && self.Notification.permission === 'granted'))
	  return;

	var data = {};
	if (event.data){
		data = event.data.json();

		var title = data.title || "Web Push Notification";
		var message = data.message || "New Push Notification Received";
		var icon = "/api/v3/pwa/landing/static/media/icon-01.28a9c607.png";
		var badge = 'images/badge.png';
		var options = {
		    body: message,
		    icon: icon,
		    badge: badge
		};
		event.waitUntil(self.registration.showNotification(title, options));
		clients.matchAll().then(function(clis) {
		    var client = clis.find(function(c) {
		      c.visibilityState === 'visible';
		    });
		    if (client !== undefined) {
		    	console.log('true');
		      //client.navigate('some_url');
		      client.focus();
		    } else {
		    	console.log(clients);
		      // there are no visible windows. Open one.
		      clients.openWindow('some_url');
		      notification.close();
		    }
		});

	}
});

self.addEventListener('notificationclose', function(e) {
	console.log(e);
	var notification = e.notification;
	console.log(notification);
	//var primaryKey = notification.data.primaryKey;

	console.log('Closed notification: ' );
});


self.addEventListener('notificationclick', function(e) {
	var notification = e.notification;
	/*console.log(e);
	
	console.log(notification);
	//var primaryKey = notification.data.primaryKey;
	var action = e.action;*/
	clients.matchAll().then(function(clis) {

	    var client = clis.find(function(c) {
	      c.visibilityState === 'visible';
	    });
	    try{
	    	console.log(localStore());
	    }catch(err){
	    	console.log(err);
	    };
	    console.log(client);
	    if (client !== undefined) {

	      client.navigate('some_url');
	      client.focus();
	    } else {
	    	console.log(clients);
	      // there are no visible windows. Open one.
	      clients.openWindow('some_url');
	      notification.close();
	    }
	    console.log(clients);
	  });

	/*if (action === 'close') {
		notification.close();
	} else {
		console.log(clients);
		console.log(window.location.href);
		//clients.openWindow('https://kkshopperdeva2.mypointofpurchase.com/api/v3/pwa/landing/1106/b3V0bGV0SWQ9MTEwNiZpY29uVXJsPWh0dHBzOi8va2stZGV2LWFzc2V0cy5zMy5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tL2ltYWdlcy9vdXRsZXRfaWNvbi8xMTA2X2ljb25fbWVyZ2VkLnBuZyZyZWdpb249TU8mc2NoZW1lPWdldGtha2k6Ly9nay50ZXN0LWFwcC5saW5rJm91dGxldE5hbWU9QnJlZXplIENhZj8gJiBJY2UgQ3JlYW0gU3RvcCBFIUF2ZW51ZUBEb3dudG93biBFYXN0JnJlZ2lzdHJhdGlvbl9pZD1kMTllM2Y5ZC01ZGZhLTQzYTktYTIxYi1lMzhmZTY5YTU2MWImb25lVGltZVRva2VuPTU5ZTAwN2NlODAxOTQyNTBiNWNiNWJiZmYyNWU3YTJj/landing/home?mode=standalone');
		notification.close();
	}*/
	notification.close();
});

async function staleWhileRevalidate(event) {
	let promise = null;
	let cachedResponse = await getCache(event.request.clone());
	let fetchPromise = await fetch(event.request.clone())
		.then((response) => {
			 setCache(event.request.clone(), response.clone());
			return response;
		})
		.catch((err) => {
			console.error(err);
		});
	return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
	let serializedHeaders = {};
	for (var entry of response.headers.entries()) {
		serializedHeaders[entry[0]] = entry[1];
	}
	let serialized = {
		headers: serializedHeaders,
		status: response.status,
		statusText: response.statusText
	};
	serialized.body = await response.json();
	return serialized;
}

async function setCache(request, response) {
	console.log(request);
	var key, data;
	let body = await request.json();
	console.log(body);
	let id = CryptoJS.MD5(JSON.stringify(body)).toString();
	console.log('getCache', id);
	var entry = {
		query: body.query,
		response: await serializeResponse(response),
		timestamp: Date.now()
	};
	idbKeyval.set(id, entry, store);
}

async function getCache(request) {
	let data;
	try {
		let body = await request.json();
		let id = CryptoJS.MD5(JSON.stringify(body)).toString();
		console.log('getCache', id);
		data = await idbKeyval.get(id, store);
		if (!data) return null;

		// Check cache max age.
		let cacheControl = request.headers.get('Cache-Control');
		let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 60*60*24*365;
		if (Date.now() - data.timestamp > maxAge * 1000) {
			console.log(`Cache expired. Load from API endpoint.`);
			return null;
		}

		console.log(`Load response from cache.`);
		return new Response(JSON.stringify(data.response.body), data.response);
	} catch (err) {
		return null;
	}
}

async function getPostKey(request) {
	let body = await request.json();
	return JSON.stringify(body);
}

var db;

function getDB() {
    if (!db) {
      db = new Promise(function(resolve, reject) {
        var openreq = indexedDB.open(store, 1);

        openreq.onerror = function() {
          reject(openreq.error);
        };

        openreq.onupgradeneeded = function() {
          // First time setup: create an empty object store
          openreq.result.createObjectStore('keyval');
        };

        openreq.onsuccess = function() {
          resolve(openreq.result);
        };
      });
    }
    return db;
}

function withStore(type, callback) {
    return getDB().then(function(db) {
      	return new Promise(function(resolve, reject) {
	        var transaction = db.transaction('keyval', type);
	        transaction.oncomplete = function() {
	          	resolve();
	        };
	        transaction.onerror = function() {
          		reject(transaction.error);
	        };
	        callback(transaction.objectStore('keyval'));
      	});
    });
}

var idbKeyval = {
    get: function(key) {
      	var req;
      	return withStore('readonly', function(store) {
        	req = store.get(key);
      	}).then(function() {
        	return req.result;
      	});
    },
    set: function(key, value) {
      	return withStore('readwrite', function(store) {
        	store.put(value, key);
      	});
    },
    delete: function(key) {
      	return withStore('readwrite', function(store) {
        	store.delete(key);
      	});
    },
    clear: function() {
      	return withStore('readwrite', function(store) {
       		store.clear();
      	});
    },
    keys: function() {
      	var keys = [];
      	return withStore('readonly', function(store) {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
	        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function() {
	          	if (!this.result) return;
	          	keys.push(this.result.key);
	          	this.result.continue();
	        };
  		}).then(function() {
        	return keys;
      	});
    }
};

if (typeof module != 'undefined' && module.exports) {
    module.exports = idbKeyval;
} else if (typeof define === 'function' && define.amd) {
    define('idbKeyval', [], function() {
      return idbKeyval;
	});
} else {
    self.idbKeyval = idbKeyval;
}
