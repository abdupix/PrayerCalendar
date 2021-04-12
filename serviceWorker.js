const SW_VERSION = '1.0.0';

self.addEventListener('push', function(event) {
  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title and body.
    self.registration.showNotification(event.data.salaah + ' Time', {
      body: event.data.message,
    })
  );
});
  
addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});