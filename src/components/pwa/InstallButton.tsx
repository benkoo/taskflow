import { useState, useEffect, useCallback } from 'react';

// Define the BeforeInstallPromptEvent type
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
}

interface InstallButtonProps {
  className?: string;
  showInstructions?: boolean;
}

const InstallButton: React.FC<InstallButtonProps> = ({
  className = '',
  showInstructions = true, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const [installStatus, setInstallStatus] = useState('Ready');
  const [debugInfo, setDebugInfo] = useState<string[]>(['Checking PWA installation requirements...']);
  const [showFirefoxInstructions, setShowFirefoxInstructions] = useState(false);
  const [showStandaloneMessage, setShowStandaloneMessage] = useState(false);
  // Track secure context and localhost status
  const [isSecure, setIsSecure] = useState(true);
  const [isLocal, setIsLocal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  
  // Helper function to add debug messages
  const addDebugInfo = useCallback((message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toISOString()}: ${message}`].slice(-10));
  }, []);
  
  // Helper function to update both status and debug info
  const updateStatus = useCallback((status: string, ...messages: string[]) => {
    setInstallStatus(status);
    messages.forEach(msg => addDebugInfo(msg));
  }, [addDebugInfo]);

  const handleInstallClick = useCallback(async () => {
    addDebugInfo('Install button clicked');
    
    if (isStandalone) {
      updateStatus(
        'TaskFlow is already installed on your device',
        'Running in standalone mode'
      );
      return;
    }

    if (typeof window === 'undefined') {
      updateStatus(
        'Installation not available',
        'Cannot install in server-side rendering environment'
      );
      return;
    }

    if (!('BeforeInstallPromptEvent' in window)) {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
      updateStatus(
        'Your browser does not support PWA installation',
        `User Agent: ${userAgent}`,
        'This feature is only available in modern browsers that support PWA installation'
      );
      return;
    }

    if (!deferredPrompt) {
      updateStatus(
        'Installation not available',
        'The installation prompt is not available. This could be because:',
        '1. The app is already installed',
        '2. The app does not meet installation criteria',
        '3. The browser does not support installation on this platform',
        `Current URL: ${window.location.href}`
      );
      return;
    }

    try {
      updateStatus('Showing installation prompt...');
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        updateStatus(
          'TaskFlow will be installed shortly',
          'Installation accepted by user'
        );
      } else {
        updateStatus(
          'Installation cancelled',
          'User dismissed the installation prompt'
        );
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error showing installation prompt:', error);
      updateStatus(
        'Error during installation',
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }, [deferredPrompt, isStandalone, updateStatus, addDebugInfo]);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    setCurrentUrl(window.location.href);

    // Check if the app is running in standalone mode
    const isInStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isInStandalone);

    // Check for Firefox
    const firefox = navigator.userAgent.toLowerCase().includes('firefox');
    setIsFirefox(firefox);

    // Check if we're in a secure context (https or localhost)
    const isLocalCheck = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    const isSecureCheck = window.isSecureContext || isLocalCheck;

    // Update state
    setIsLocal(isLocalCheck);
    setIsSecure(isSecureCheck);

    // Add debug info
    addDebugInfo(`Browser: ${navigator.userAgent}`);
    addDebugInfo(`HTTPS: ${window.location.protocol === 'https:' ? 'Yes' : 'No'}`);
    addDebugInfo(`Service Worker: 'serviceWorker' in navigator ? ${'serviceWorker' in navigator ? 'Yes' : 'No'}`);
    addDebugInfo(`Standalone check: ${isInStandalone}`);
    addDebugInfo(`Localhost: ${isLocalCheck ? 'Yes' : 'No'}`);
    addDebugInfo(`Secure Context: ${isSecureCheck ? 'Yes' : 'No'}`);
    addDebugInfo(`Browser detected: Firefox: ${firefox}, Chrome: ${/Chrome/.test(navigator.userAgent)}, Edge: ${/Edg/.test(navigator.userAgent)}, Safari: ${/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)}`);

    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS) {
      addDebugInfo('iOS device detected - may have different installation behavior');
    }

    // Check for WebView
    const isWebView = (window as any).webkit && (window as any).webkit.messageHandlers;
    if (isWebView) {
      addDebugInfo('Running in WebView - PWA installation not supported');
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const event = e as unknown as BeforeInstallPromptEvent;

      addDebugInfo('beforeinstallprompt event received');
      setDeferredPrompt(event);
      updateStatus(
        'Ready to install',
        'Installation prompt is available',
        `Platforms: ${event.platforms.join(', ')}`
      );

      if (navigator.userAgent.toLowerCase().includes('firefox')) {
        setShowFirefoxInstructions(true);
      }
    };

    const handleAppInstalled = () => {
      updateStatus(
        'App successfully installed!',
        'TaskFlow has been installed on your device'
      );
      setShowFirefoxInstructions(false);
      setShowStandaloneMessage(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [addDebugInfo, updateStatus]);

  // Don't show anything if the app is already installed and we're not showing a message
  if (isStandalone && !showStandaloneMessage) {
    return null;
  }

  // Show loading state during SSR
  if (!isClient) {
    return <div className="p-4">Loading installation options...</div>;
  }

  // Show warning if not in a secure context and not on localhost
  if (!isSecure && !isLocal) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">PWA Installation</span>
        </div>
        <p className="mt-2 text-sm">
          This app needs to be served over HTTPS for installation. 
          In development, you can use <code className="bg-yellow-200 px-1 rounded">localhost</code>.
        </p>
        <p className="mt-2 text-xs opacity-75">
          Current URL: {currentUrl}
        </p>
      </div>
    );
  }

  // Show Firefox installation instructions if needed
  if (isFirefox && showFirefoxInstructions) {
    return (
      <div className={`p-4 bg-yellow-50 rounded-md ${className}`}>
        <h3 className="text-sm font-medium text-yellow-800">Installation Instructions for Firefox</h3>
        <p className="mt-2 text-sm text-yellow-700">
          To install TaskFlow in Firefox, click the menu button and select "Install" from the options.
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowFirefoxInstructions(false)}
            className="text-sm font-medium text-yellow-700 hover:text-yellow-600"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  // Show standalone message if the app is installed
  if (showStandaloneMessage) {
    return (
      <div className={`p-4 bg-green-50 rounded-md ${className}`}>
        <h3 className="text-sm font-medium text-green-800">TaskFlow is installed</h3>
        <p className="mt-1 text-sm text-green-700">
          You can now use TaskFlow as a standalone app.
        </p>
      </div>
    );
  }

  // Show the main install button
  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleInstallClick}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={!deferredPrompt || isStandalone}
      >
        {isStandalone ? 'Installed' : 'Install TaskFlow'}
      </button>

      {/* Show debug information in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <div>
          <h3 className="text-sm font-medium text-gray-900">Debug Information</h3>
          <p className="mt-1 text-sm text-gray-600">{installStatus}</p>
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-700 max-h-40 overflow-y-auto font-mono">
            {debugInfo.map((line, i) => (
              <div key={i} className="py-1 border-b border-gray-200 last:border-0">{line}</div>
            ))}
          </div>
          <pre>
            {JSON.stringify({
              isStandalone,
              isFirefox,
              installStatus,
              showFirefoxInstructions,
              showStandaloneMessage,
              deferredPrompt: !!deferredPrompt,
              isSecureContext: isSecure,
              isLocalhost: isLocal,
              currentUrl: currentUrl
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default InstallButton;
