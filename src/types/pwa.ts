// Type for the beforeinstallprompt event
export interface PWAInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed' }>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    handleInstallClick: () => Promise<void>;
    beforeInstallPromptEvent?: PWAInstallPromptEvent;
  }
}
