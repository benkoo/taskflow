// Extend the global scope for TypeScript
declare const self: ServiceWorkerGlobalScope;
declare const workbox: any;
declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
  };
};

// Extend the Window interface to include our custom properties
declare interface Window {
  // PWA installation prompt
  deferredPrompt?: BeforeInstallPromptEvent;
  
  // Service worker registration
  workbox?: {
    register: () => Promise<void>;
  };
  
  // Environment variables
  ENV: {
    MODE: string;
    DEV: boolean;
    PROD: boolean;
    SSR: boolean;
  };
  
  // Add any other window-level properties your app uses
  addTask: (title: string, priority: 'low' | 'medium' | 'high') => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

// Extend the Navigator interface for PWA installation
declare interface Navigator {
  // PWA installation
  serviceWorker?: ServiceWorkerContainer;
  
  // Standalone mode (iOS)
  standalone?: boolean;
  
  // Add any other navigator properties your app uses
}

// Define the BeforeInstallPromptEvent for PWA installation
declare interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Extend the WindowEventMap to include our custom events
declare interface WindowEventMap {
  'beforeinstallprompt': BeforeInstallPromptEvent;
  'appinstalled': Event;
}

// Extend the ServiceWorkerGlobalScope for service worker events
declare interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  __WB_MANIFEST: string[];
  __precacheManifest: any[];
  skipWaiting(): void;
  clients: Clients;
}

// Add any other global type declarations your app needs

declare module '*.astro' {
  const Component: any;
  export default Component;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}

// Add type declarations for the Vite PWA plugin
declare module '@vite-pwa/astro/service-worker' {
  export interface WorkboxPlugin {
    name: string;
    handler: (options: any) => any;
  }

  export interface WorkboxOptions {
    globPatterns?: string[];
    runtimeCaching?: any[];
    navigateFallback?: string;
    clientsClaim?: boolean;
    skipWaiting?: boolean;
    cleanupOutdatedCaches?: boolean;
    sourcemap?: boolean;
  }

  export interface VitePWAOptions {
    strategies?: 'generateSW' | 'injectManifest';
    registerType?: 'autoUpdate' | 'prompt';
    injectManifest?: {
      globPatterns?: string[];
      globIgnores?: string[];
    };
    workbox?: WorkboxOptions;
    manifest?: {
      name?: string;
      short_name?: string;
      description?: string;
      theme_color?: string;
      background_color?: string;
      display?: string;
      orientation?: string;
      scope?: string;
      start_url?: string;
      icons?: Array<{
        src: string;
        sizes: string;
        type: string;
        purpose?: string;
      }>;
      screenshots?: Array<{
        src: string;
        sizes: string;
        type: string;
        form_factor?: string;
      }>;
      shortcuts?: Array<{
        name: string;
        short_name?: string;
        description?: string;
        url: string;
        icons?: Array<{
          src: string;
          sizes: string;
        }>;
      }>;
    };
    devOptions?: {
      enabled?: boolean;
      type?: 'module' | 'classic';
      navigateFallback?: string;
    };
    includeAssets?: string | string[];
    srcDir?: string;
    outDir?: string;
    filename?: string;
    base?: string;
    scope?: string;
    minify?: boolean;
    includeManifestIcons?: boolean;
    disable?: boolean;
  }
}

// Add type declarations for the Vite PWA client
declare module '@vite-pwa/astro/client' {
  export interface ClientOptions {
    registerType?: 'autoUpdate' | 'prompt';
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: any) => void;
  }

  export function registerSW(options?: ClientOptions): void;
}

// Add type declarations for the Web Push API
interface PushSubscriptionOptionsInit {
  userVisibleOnly?: boolean;
  applicationServerKey?: BufferSource | string | null;
}

// Extend the ServiceWorkerRegistration interface to include the update method
interface ServiceWorkerRegistration {
  update(): Promise<void>;
}
