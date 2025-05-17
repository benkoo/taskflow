// Global TypeScript declarations for PWA

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

declare global {
  interface Window {
    // For PWA installation
    deferredPrompt?: BeforeInstallPromptEvent;
    
    // For backward compatibility
    handleInstallClick?: () => Promise<void>;
    beforeInstallPromptEvent?: BeforeInstallPromptEvent;
  }
}

export type { BeforeInstallPromptEvent };
