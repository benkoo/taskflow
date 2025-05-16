# PWA Installation Demo

A Progressive Web App (PWA) demo built with Astro, showcasing PWA installation and service worker functionality.

## Features

- 📱 Installable PWA with custom installation prompt
- 🔄 Service worker for offline functionality
- 🎨 Responsive design with Tailwind CSS
- 🚀 Fast and optimized for production

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd taskflow
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4321`

## 🛠 Project Structure

```
/
├── public/                 # Static files
│   ├── favicon.ico         # Favicon
│   ├── favicon.svg         # SVG favicon
│   ├── manifest.json       # Web App Manifest
│   └── sw.js              # Service Worker
├── src/
│   ├── components/        # Reusable components
│   │   └── pwa/           # PWA-specific components
│   │       ├── InstallButton.astro  # PWA install button
│   │       └── PWAProvider.astro    # PWA initialization
│   ├── layouts/
│   │   └── Layout.astro  # Main layout component
│   ├── pages/
│   │   └── index.astro  # Home page
│   └── utils/
│       └── registerServiceWorker.ts  # Service worker registration
├── astro.config.mjs        # Astro configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies
```

## 🧞 Available Scripts

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Install dependencies                            |
| `npm run dev`             | Start development server at `localhost:4321`     |
| `npm run build`           | Build for production to `./dist/`                |
| `npm run preview`         | Preview production build locally                 |
| `npm run astro ...`       | Run Astro CLI commands                          |
| `npm run check`           | Check for TypeScript errors                      |

## PWA Features

### Installation

1. The app will show an install button when it's installable
2. Click the button to install the PWA on your device
3. Once installed, the app will work offline

### Service Worker

- Caches core assets for offline use
- Automatically updates when new content is available
- Provides a seamless offline experience

## Browser Support

This PWA works best in modern browsers that support:

- Service Workers
- Web App Manifest
- ES Modules
- Async/Await

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
