// Utility for managing push notifications
type NotificationPermission = 'default' | 'granted' | 'denied';

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notifications');
    return 'denied';
  }

  // Check if permission is already granted
  if (Notification.permission === 'granted') {
    return 'granted';
  }

  // Request permission from the user
  const permission = await Notification.requestPermission();
  return permission as NotificationPermission;
};

export const showNotification = (title: string, options?: NotificationOptions) => {
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notifications');
    return;
  }

  // Check if permission is granted
  if (Notification.permission === 'granted') {
    // Create and show the notification
    const notification = new Notification(title, {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      ...options,
    });

    // Handle notification click
    notification.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notification.close();
      
      // You can add custom behavior when the notification is clicked
      if (options?.data?.url) {
        window.open(options.data.url, '_blank');
      }
    };

    return notification;
  }
  
  console.warn('Notification permission not granted');
  return null;
};

// Register the service worker
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed: ', error);
      return null;
    }
  }
  return null;
};

// Subscribe to push notifications
const subscribeToPushNotifications = async (registration: ServiceWorkerRegistration) => {
  // Check if push manager is available
  if (!('PushManager' in window)) {
    console.warn('Push messaging is not supported');
    return null;
  }

  try {
    // Get the subscription from the service worker
    let subscription = await registration.pushManager.getSubscription();
    
    // If no subscription, create a new one
    if (!subscription) {
      // VAPID public key should be the same as the one used by your server
      const response = await fetch('/api/vapid-public-key');
      const vapidPublicKey = await response.text();
      
      // Convert the VAPID public key to a Uint8Array
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      
      // Subscribe the user
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
      
      // Send the subscription to your server
      await sendSubscriptionToServer(subscription);
    }
    
    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
};

// Convert a base64 string to a Uint8Array
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
};

// Send the subscription to your server
const sendSubscriptionToServer = async (subscription: PushSubscription) => {
  try {
    const response = await fetch('/api/push-subscription', {
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

// Initialize push notifications
export const initializePushNotifications = async () => {
  try {
    // Request notification permission
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    
    // Register the service worker
    const registration = await registerServiceWorker();
    if (!registration) {
      throw new Error('Failed to register service worker');
    }
    
    // Subscribe to push notifications
    const subscription = await subscribeToPushNotifications(registration);
    if (!subscription) {
      throw new Error('Failed to subscribe to push notifications');
    }
    
    return { registration, subscription };
  } catch (error) {
    console.error('Error initializing push notifications:', error);
    return null;
  }
};

// Example usage:
// Initialize push notifications when the app loads
// initializePushNotifications().then(({ registration, subscription }) => {
//   console.log('Push notifications initialized:', { registration, subscription });
// });
