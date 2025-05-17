// Type definitions for PWA installation
export {};

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
  }

  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}
