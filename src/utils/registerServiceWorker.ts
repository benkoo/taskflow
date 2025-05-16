// Register the service worker for the PWA demo
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  console.warn('Manual service worker registration in registerServiceWorker.ts is disabled. vite-plugin-pwa handles registration.');
  return null;
};
