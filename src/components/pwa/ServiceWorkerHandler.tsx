import { useEffect } from 'react';
import { registerServiceWorker } from '../../utils/registerServiceWorker';

interface ServiceWorkerHandlerProps {
  // Add any props here if needed in the future
}

export const ServiceWorkerHandler: React.FC<ServiceWorkerHandlerProps> = (): null => {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      return undefined;
    }

    // Add a class to the html element to indicate service worker support
    document.documentElement.classList.add('has-service-worker');
    
    // Register the service worker
    registerServiceWorker().catch(console.error);
    
    // Listen for update events
    const handleUpdate = (): void => {
      console.log('Update available!');
      // Here you could show a UI prompt to the user
    };
    
    window.addEventListener('sw-update', handleUpdate);
    
    return (): void => {
      window.removeEventListener('sw-update', handleUpdate);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ServiceWorkerHandler;
