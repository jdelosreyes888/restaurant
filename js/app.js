// Register the service worker
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register('./serviceworker.js').then(function(registration) {
  
        let sw;
  
  
        if (registration.waiting) {
            sw = registration.waiting;
            update(sw);
            console.log('SW installed and waiting!' + sw);
        } else if (registration.installing) {
            sw = registration.installing;
            sw.addEventListener('statechange', function() {
                if (sw.state == 'installed') {
                    update(sw);
                }
            });
            console.log('SW installing!' + sw);
        }
  
  
        registration.addEventListener('updatefound', function() {
            sw = registration.installing;
            sw.addEventListener('statechange', function() {
                if (sw.state == 'installed') {
                    update(sw);
                }
            })
        });
  
    }).catch(function(err) {
        console.log("SW Registration failed!", err);
    });
  
    // Reload the browser for each Controller Change
    navigator.serviceWorker.addEventListener('controllerchange', function() {
        window.location.reload();
    });
  }
  
  // Update the message to trigger an event 
  function update(worker) {
    worker.postMessage({
        action: 'skipWaiting'
    })
  }