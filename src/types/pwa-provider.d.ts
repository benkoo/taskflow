// Type definitions for PWA Provider

import type { NotificationManager } from './notification-types';

declare global {
  interface Window {
    notificationManager: NotificationManager;
    refreshApp: () => void;
  }
}

export interface ServiceWorkerMessage {
  type: string;
  notificationId?: string;
  action?: string;
}
