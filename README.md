# TaskFlow - A Modern PWA Task Manager

A feature-rich Progressive Web Application (PWA) for task management, built with Astro, React, and Tailwind CSS. This application demonstrates best practices for building installable PWAs with offline capabilities.

## ✨ Features

- 📱 **Progressive Web App** - Installable on desktop and mobile devices
- ⚡ **Fast & Reliable** - Works offline with service workers
- 🎨 **Responsive Design** - Works on all screen sizes
- 🔄 **Real-time Updates** - Stay in sync across devices
- 📝 **Task Management** - Create, update, and organize your tasks
- 🚀 **Modern Tech Stack**: Astro, React, TypeScript, and Tailwind CSS

## 🚀 Installation

### Web Browser

1. Open [TaskFlow](https://your-app-url.com) in Chrome, Edge, or Firefox
2. Look for the install button in the address bar (Chrome/Edge) or the app menu (Firefox)
3. Click "Install" and follow the prompts

### Mobile Devices

#### Android (Chrome)
1. Open TaskFlow in Chrome
2. Tap the menu (three dots) in the top-right corner
3. Tap "Add to Home screen"
4. Confirm by tapping "Add"

#### iOS (Safari)
1. Open TaskFlow in Safari
2. Tap the share button (box with an arrow)
3. Tap "Add to Home Screen"
4. Tap "Add" in the top-right corner

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm

### Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/taskflow.git
   cd taskflow
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## 🌟 PWA Features

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

## 🏗 Project Structure

```
/
├── public/                 # Static files
│   ├── favicon.ico         # Favicon
│   ├── favicon.svg         # SVG favicon
│   ├── icons/              # App icons for PWA
│   ├── manifest.json       # Web App Manifest
│   └── sw.js              # Service Worker
├── src/
│   ├── assets/            # Static assets
│   ├── components/         # Reusable components
│   │   ├── pwa/           # PWA-specific components
│   │   │   ├── InstallButton.astro  # PWA install button
│   │   │   └── PWAProvider.astro    # PWA initialization
│   ├── layouts/           # Layout components
│   │   └── Layout.astro   # Main layout
│   ├── pages/             # Application pages
│   │   └── index.astro    # Home page
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript type definitions
│   │   └── pwa.ts         # PWA type definitions and interfaces
│   └── utils/             # Utility functions
│       ├── notifications.ts  # Web Push Notifications
│       ├── pwa.ts          # PWA utilities
│       └── storage.ts      # Local storage utilities
└── astro.config.mjs       # Astro configuration
```

## 📝 Available Scripts

| Command                   | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `npm install`            | Install dependencies                          |
| `npm run dev`            | Start development server                     |
| `npm run build`          | Build for production to `./dist/`            |
| `npm run preview`        | Preview production build locally              |
| `npm run astro ...`      | Run Astro CLI commands                       |
| `npm run check`          | Check for TypeScript errors                   |
| `npm run format`         | Format code with Prettier                     |
| `npm run lint`           | Run ESLint to check for code style issues     |
| `npm run lint:fix`       | Fix auto-fixable ESLint issues                |
| `npm run test`           | Run tests                                     |
| `npm run test:watch`     | Run tests in watch mode                      |

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes and commit them with descriptive messages
4. Push your changes to your fork
5. Open a Pull Request

## 🙏 Acknowledgments

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name]
