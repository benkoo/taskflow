// Type definitions for notification types

declare global {
  interface Window {
    notificationManager: NotificationManager;
    refreshApp: () => void;
  }
}

export interface BaseNotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  image?: string;
  badge?: string;
  vibrate?: number[];
  tag?: string;
  renotify?: boolean;
  silent?: boolean;
  requireInteraction?: boolean;
  data?: Record<string, any>;
  actions?: NotificationAction[];
  timestamp?: number;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface TaskReminderOptions {
  id: string;
  title: string;
  dueDate: Date;
  data?: Record<string, any>;
}

export interface NotificationManager {
  requestPermission(): Promise<NotificationPermission>;
  showNotification(options: NotificationOptions): Promise<void>;
  showTaskReminder(options: TaskReminderOptions): Promise<void>;
  // Add other methods as needed
}

// For backward compatibility
export type NotificationOptions = BaseNotificationOptions;
