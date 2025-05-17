// Re-export the notification manager
export * from './notificationManager';

// Use the built-in Notification type for compatibility
type NotificationPermission = 'default' | 'granted' | 'denied';

// Export the type for backward compatibility
export type { NotificationPermission };

// Define NotificationOptions type for backward compatibility
type NotificationOptions = {
  body?: string;
  icon?: string;
  badge?: string;
  data?: any;
  tag?: string;
  image?: string;
  silent?: boolean;
  timestamp?: number;
  renotify?: boolean;
  requireInteraction?: boolean;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  vibrate?: number[];
};

// Legacy functions - deprecated, use NotificationManager instead

/**
 * @deprecated Use notificationManager.requestPermission() instead
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  const { notificationManager } = await import('./notificationManager');
  return notificationManager.requestPermission();
};

/**
 * @deprecated Use notificationManager.showNotification() instead
 */
export const showNotification = (title: string, options?: NotificationOptions): Notification | null => {
  console.warn('showNotification is deprecated. Use notificationManager.showNotification() instead');
  
  if ('Notification' in window && Notification.permission === 'granted') {
    // Create a new notification with only standard properties
    const notification = new Notification(title, {
      body: options?.body,
      icon: options?.icon || '/icons/icon-192x192.png',
      tag: options?.tag,
      data: options?.data,
      silent: options?.silent,
      // @ts-ignore - Some properties might not be in the lib.dom.d.ts but are valid in some browsers
      badge: options?.badge || '/icons/icon-192x192.png',
    });

    // Add non-standard properties if they exist
    if (options?.vibrate && 'vibrate' in notification) {
      // @ts-ignore
      notification.vibrate = options.vibrate;
    }
    
    if (options?.renotify && 'renotify' in notification) {
      // @ts-ignore
      notification.renotify = options.renotify;
    }
    
    if (options?.requireInteraction && 'requireInteraction' in notification) {
      // @ts-ignore
      notification.requireInteraction = options.requireInteraction;
    }
    
    if (options?.actions && 'actions' in notification) {
      // @ts-ignore
      notification.actions = options.actions;
    }

    notification.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notification.close();
      
      if (options?.data?.url) {
        window.open(options.data.url, '_blank');
      }
    };

    return notification;
  }
  
  return null;
};

// Service worker and push notification utilities

/**
 * Register the service worker
 * @returns Promise<ServiceWorkerRegistration | null>
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        type: 'module',
      });
      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  console.warn('Service workers are not supported in this browser');
  return null;
};

/**
 * Subscribe to push notifications
 * @deprecated Use notificationManager and the Web Push API directly
 */
export const subscribeToPushNotifications = async (registration: ServiceWorkerRegistration) => {
  console.warn('subscribeToPushNotifications is deprecated. Use the Web Push API directly with notificationManager');
  
  if (!('PushManager' in window)) {
    console.warn('Push notifications are not supported in this browser');
    return null;
  }

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
    });

    await sendSubscriptionToServer(subscription);
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
};

// Internal helper functions

/**
 * Convert a base64 string to a Uint8Array
 */
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
};

/**
 * Send the subscription to your server
 */
const sendSubscriptionToServer = async (subscription: PushSubscription) => {
  try {
    const response = await fetch('/api/push-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending subscription to server:', error);
    throw error;
  }
};

/**
 * Initialize push notifications
 * @deprecated Use notificationManager directly
 */
export const initializePushNotifications = async () => {
  console.warn('initializePushNotifications is deprecated. Use notificationManager directly');
  
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported in this browser');
    return { registration: null, subscription: null };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return { registration, subscription: null };
    }

    const subscription = await subscribeToPushNotifications(registration);
    return { registration, subscription };
  } catch (error) {
    console.error('Error initializing push notifications:', error);
    return { registration: null, subscription: null };
  }
};

// Example usage:
// Initialize push notifications when the app loads
// initializePushNotifications().then(({ registration, subscription }) => {
//   console.log('Push notifications initialized:', { registration, subscription });
// });
