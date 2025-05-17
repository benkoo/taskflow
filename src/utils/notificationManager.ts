// Import types with type-only import
import type { BaseNotificationOptions, NotificationAction } from '../types/notification-types';

// Re-export types for backward compatibility
export type { BaseNotificationOptions, NotificationAction };

export type NotificationPermission = 'default' | 'granted' | 'denied';

export interface NotificationOptions extends BaseNotificationOptions {
  // Additional properties specific to our implementation
  data?: Record<string, any>;
  actions?: NotificationAction[];
}

export interface TaskReminderOptions {
  id: string;
  title: string;
  dueDate: Date;
  data?: Record<string, any>;
}

// Export NotificationManager interface for type checking
export interface INotificationManager {
  requestPermission(): Promise<NotificationPermission>;
  showNotification(options: NotificationOptions): Promise<Notification | null>;
  showTaskReminder(options: TaskReminderOptions): Promise<void>;
}

export class NotificationManager implements INotificationManager {
  private static instance: NotificationManager;
  private permission: NotificationPermission = 'default';
  private isSupported: boolean;

  private constructor() {
    this.isSupported = 'Notification' in window;
    if (this.isSupported) {
      this.permission = Notification.permission;
    }
  }

  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
      console.warn('Notifications are not supported in this browser');
      return 'denied';
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  public async showNotification(options: NotificationOptions): Promise<Notification | null> {
    if (!this.isSupported) {
      console.warn('Notifications are not supported in this browser');
      return null;
    }

    // Request permission if not already granted
    if (this.permission !== 'granted') {
      this.permission = await this.requestPermission();
      if (this.permission !== 'granted') {
        return null;
      }
    }

    try {
      const notification = new Notification(options.title, {
        ...options,
        body: options.body || '',
      });

      // Handle notification click
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();

        // Handle any custom click action
        if (options.data?.url) {
          window.open(options.data.url, '_blank');
        }
      };

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      throw error;
    }
  }

  // Show a task reminder notification
  public async showTaskReminder(options: TaskReminderOptions): Promise<void> {
    if (!this.isSupported) {
      console.warn('Notifications are not supported in this browser');
      return;
    }

    if (this.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    const dueDate = options.dueDate ? new Date(options.dueDate) : new Date();
    const now = new Date();
    const timeUntilDue = dueDate.getTime() - now.getTime();

    // Only show notification if the due date is in the future
    if (timeUntilDue > 0) {
      const hoursUntilDue = Math.ceil(timeUntilDue / (1000 * 60 * 60));
      
      let body = '';
      if (hoursUntilDue < 24) {
        body = `Due in ${hoursUntilDue} hour${hoursUntilDue === 1 ? '' : 's'}`;
      } else {
        const daysUntilDue = Math.ceil(timeUntilDue / (1000 * 60 * 60 * 24));
        body = `Due in ${daysUntilDue} day${daysUntilDue === 1 ? '' : 's'}`;
      }

      try {
        await this.showNotification({
          title: options.title,
          body,
          data: { 
            url: `/tasks/${options.id}`,
            taskId: options.id,
            type: 'task-reminder',
            ...(options.data || {})
          },
          icon: '/icons/icon-192x192.png',
          tag: `task-reminder-${options.id}`,
          renotify: true,
          requireInteraction: true,
          vibrate: [200, 100, 200, 100, 200, 100, 400],
        });
      } catch (error) {
        console.error('Error showing task reminder:', error);
        throw error;
      }
    }
  }

  // Example method to show a generic success message
  public async showSuccess(message: string) {
    return this.showNotification({
      title: 'Success',
      body: message,
      data: { type: 'success' },
      tag: 'success-notification',
    });
  }

  // Example method to show a generic error message
  public async showError(message: string) {
    return this.showNotification({
      title: 'Error',
      body: message,
      data: { type: 'error' },
      tag: 'error-notification',
      requireInteraction: true,
    });
  }

  // Check if notifications are supported and allowed
  public canNotify(): boolean {
    return this.isSupported && this.permission === 'granted';
  }
}

// Export a singleton instance
export const notificationManager = NotificationManager.getInstance();
