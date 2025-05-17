# TaskFlow - A Modern PWA Task Manager

A feature-rich Progressive Web App (PWA) for task management, built with Astro, React, and Tailwind CSS. This application demonstrates best practices for building installable PWAs with offline capabilities.

## ✨ Features

- 📱 **Installable PWA** with custom installation prompt
- 🔄 **Offline-first** with service worker and Workbox
- 🎨 **Responsive design** built with Tailwind CSS
- ⚡ **Fast loading** with code splitting and optimizations
- 📦 **Modern tech stack**: Astro, React, TypeScript
- 🔒 **Type-safe** with TypeScript
- 🛠 **Developer-friendly** with hot module replacement

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/taskflow.git
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

## 🏗 Project Structure

```
/
├── public/                 # Static files
│   ├── favicon.ico         # Favicon
│   ├── favicon.svg         # SVG favicon
│   ├── icons/              # App icons for PWA
│   ├── manifest.json       # Web App Manifest
│   └── styles/             # Global styles
├── src/
│   ├── assets/            # Static assets
│   ├── components/         # Reusable components
│   │   ├── pwa/           # PWA-specific components
│   │   │   ├── InstallButton.astro  # PWA install button
│   │   │   └── PWAProvider.astro    # PWA initialization
│   │   └── Welcome.astro  # Welcome component
│   ├── layouts/           # Layout components
│   │   └── Layout.astro   # Main layout
│   ├── pages/             # Application pages
│   │   └── index.astro    # Home page
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
│       ├── notifications.ts  # Web Push Notifications
│       ├── pwa.ts          # PWA utilities
│       └── registerServiceWorker.ts  # Service worker registration
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🛠 Development

### Available Scripts

| Command                   | Action                                           |
| :------------------------ | :---------------------------------------------- |
| `npm install`            | Install dependencies                            |
| `npm run dev`            | Start development server at `localhost:4321`    |
| `npm run build`          | Build for production to `./dist/`               |
| `npm run preview`        | Preview production build locally                |
| `npm run astro ...`      | Run Astro CLI commands                         |
| `npm run check`          | Check for TypeScript errors                     |


## 📱 PWA Features

### Installation

1. The app will show an install button when it's installable
2. Click the button to install the PWA on your device
3. Once installed, the app will work offline

### Service Worker

- Caches core assets for offline use using Workbox
- Automatically updates when new content is available
- Provides a seamless offline experience
- Implements cache-first strategy for assets
- Handles push notifications

## 🌐 Browser Support

This PWA works best in modern browsers that support:

- Service Workers
- Web App Manifest
- ES Modules
- Async/Await

### Tested Browsers

- ✅ Microsoft Edge (Latest)
- ✅ Google Chrome (Latest)
- ✅ Mozilla Firefox (Latest)
- ✅ Safari 15+ (macOS, iOS)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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
