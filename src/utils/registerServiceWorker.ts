// Register the service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser');
    return null;
  }

  try {
    // Unregister any existing service workers first
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
      console.log('Unregistered old service worker');
    }

    // Clear all caches
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map(key => caches.delete(key)));
    console.log('Cleared all caches');

    // Register the new service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      updateViaCache: 'none',
      scope: '/'
    });

    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    
    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      console.log('New service worker found:', newWorker);

      newWorker.addEventListener('statechange', () => {
        if (!newWorker) return;
        console.log('Service worker state changed:', newWorker.state);

        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available
            console.log('New content is available; please refresh.');
            // Optional: Dispatch an event that the UI can listen to
            window.dispatchEvent(new Event('sw-update'));
          } else {
            // First install
            console.log('Content is now available offline!');
          }
        }
      });
    });
    
    // Ensure the service worker is properly controlling the page
    if (registration.active) {
      console.log('Service worker is active and ready');
    }
    
    return registration;
  } catch (error) {
    console.error('ServiceWorker registration failed: ', error);
    return null;
  }
};

// Initialize service worker when the page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    registerServiceWorker().catch(console.error);
  });
}
