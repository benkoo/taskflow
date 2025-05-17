import React, { useEffect, useState } from 'react';

// Define props interface for the Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

// Create a custom Button component with proper TypeScript types
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';

const NotificationPrompt: React.FC = () => {
  // State to manage prompt visibility
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // FOR TESTING: Always show the prompt regardless of permission state
    setIsVisible(true);
    
    /* Uncomment this for production use
    // Check if notifications are supported and permission is not granted or denied
    const isNotificationSupported = 'Notification' in window;
    if (!isNotificationSupported) return;

    const currentPermission = Notification.permission;
    if (currentPermission === 'granted' || currentPermission === 'denied') return;
    
    // Check if the prompt was previously dismissed
    const isDismissed = localStorage.getItem('notificationPromptDismissed') === 'true';
    if (isDismissed) return;
    
    // Show the prompt
    setIsVisible(true);
    */
  }, []);

  // Handle dismiss button click
  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to prevent showing again
    localStorage.setItem('notificationPromptDismissed', 'true');
  };

  // Handle enable button click
  const handleEnable = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
      }
      setIsVisible(false);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  // Don't render anything if the prompt shouldn't be visible
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 max-w-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      role="alertdialog"
      aria-labelledby="notification-prompt-title"
      aria-describedby="notification-prompt-description"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <svg 
            className="w-6 h-6 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 id="notification-prompt-title" className="text-lg font-medium text-gray-900 dark:text-white">
            Enable Notifications
          </h3>
          <p id="notification-prompt-description" className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Get notified about important updates and new features.
          </p>
          <div className="mt-4 flex space-x-3">
            <Button
              onClick={handleDismiss}
              type="button"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Dismiss
            </Button>
            <Button
              onClick={handleEnable}
              type="button"
              className="border border-transparent text-white bg-blue-600 hover:bg-blue-700"
            >
              Enable
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPrompt;
