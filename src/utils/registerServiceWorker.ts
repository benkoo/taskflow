// Register the service worker for the PWA demo
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser');
    return null;
  }

  try {
    // Unregister any existing service workers first
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      console.log('Unregistering existing service worker:', registration.scope);
      await registration.unregister();
    }

    // Clear all caches
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );

    // Register the service worker
    console.log('Registering service worker...');
    const registration = await navigator.serviceWorker.register('/sw.js', {
      updateViaCache: 'none',
      scope: '/'
    });

    console.log('ServiceWorker registered with scope:', registration.scope);
    
    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;
    console.log('Service Worker is ready to work offline');
    
    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (!newWorker) return;
        console.log('Service worker state:', newWorker.state);

        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log('New content available; please refresh.');
            window.dispatchEvent(new Event('sw-update'));
          } else {
            console.log('App is now available offline!');
          }
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
};

// Auto-initialize service worker in the browser
if (typeof window !== 'undefined') {
  console.log('Initializing service worker...');
  window.addEventListener('load', () => {
    registerServiceWorker().catch(error => {
      console.error('Failed to register service worker:', error);
    });
  });
}
