// Minimal PWA implementation with TypeScript
import type { BeforeInstallPromptEvent } from '../types/pwa';

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    // PWA installation
    deferredPrompt: BeforeInstallPromptEvent | null;
    handleInstallClick(): Promise<void>;
    beforeInstallPromptEvent?: BeforeInstallPromptEvent;
  }
}

// Initialize deferredPrompt on window
if (typeof window !== 'undefined') {
  window.deferredPrompt = null;
}

/**
 * Check if the app can be installed as a PWA
 */
export const isPWAInstallable = (): boolean => {
  return typeof window !== 'undefined' && 'BeforeInstallPromptEvent' in window;
};

/**
 * Check if the app is already installed
 */
export const isPWAInstalled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches;
};

/**
 * Get installation instructions based on the user's browser
 */
export const getInstallInstructions = (): string => {
  if (typeof window === 'undefined') return 'Install this app on your device';
  
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isSafari = /Safari/.test(navigator.userAgent) && !isChrome;
  const isEdge = /Edg/.test(navigator.userAgent);

  if (isMobile) {
    if (isChrome) return 'Tap ⋮ (menu) → Install App';
    if (isEdge) return 'Tap ⋯ (menu) → Install';
    if (isSafari) return 'Tap Share → Add to Home Screen';
  } else if (isChrome || isEdge) {
    return 'Click Install in the address bar →';
  } else if (isSafari) {
    return 'Use File > Add to Desktop';
  }

  return 'Check browser menu for install option';
};

/**
 * Initialize PWA installation prompt
 */
export const initializePWA = (): void => {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default prompt
    e.preventDefault();
    // Store the event for later use
    window.deferredPrompt = e as unknown as BeforeInstallPromptEvent;
    console.log('PWA installation available');
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    window.deferredPrompt = null;
  });
};

/**
 * Register the service worker
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported in this environment');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    console.log('Service Worker registered with scope:', registration.scope);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};
