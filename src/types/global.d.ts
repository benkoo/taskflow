// Global TypeScript declarations for PWA

// Export the BeforeInstallPromptEvent interface
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed' }>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  readonly platforms?: string[];
}

// Define the additional properties we're adding to Window
interface CustomWindowExtensions {
  // Notification related
  showTestNotification: () => Promise<void>;
  requestPermission: () => Promise<NotificationPermission>;
  requestNotificationPermission: () => Promise<NotificationPermission>;
  updateUI: () => void;
  
  // PWA installation
  deferredPrompt: BeforeInstallPromptEvent | null;
  handleInstallClick: () => Promise<void>;
  beforeInstallPromptEvent?: BeforeInstallPromptEvent;
}

declare global {
  // Make BeforeInstallPromptEvent available globally
  var BeforeInstallPromptEvent: {
    prototype: BeforeInstallPromptEvent;
    new(type: string, eventInitDict?: EventInit): BeforeInstallPromptEvent;
  };

  // Extend the Window interface with our custom properties
  interface Window extends CustomWindowExtensions {}
  
  // Extend NotificationOptions if needed
  interface NotificationOptions {
    vibrate?: number[];
    actions?: Array<{ action: string; title: string }>;
  }

  // Add beforeinstallprompt to WindowEventMap
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}
