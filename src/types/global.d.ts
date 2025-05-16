// Global TypeScript declarations

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed' }>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    handleInstallClick: () => Promise<void>;
    beforeInstallPromptEvent?: BeforeInstallPromptEvent;
  }
}

export type { BeforeInstallPromptEvent };
