// @ts-check
import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        // If your src/sw.js is a complete service worker using workbox imports,
        // you should use injectManifest. Otherwise, workbox.globPatterns will generate one.
        strategies: 'injectManifest', 
        srcDir: 'src', // Points to the directory where your custom sw.js is located
        filename: 'sw.js', // The name of your service worker file in the srcDir
        // includeAssets: ['favicon.svg', 'icons/*.png', 'screenshots/*.png'], // Adjusted to include actual icon and screenshot paths
        manifest: {
          name: 'TaskFlow',
          short_name: 'TaskFlow',
          description: 'A modern task management PWA',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#000000', // Theme color from src/manifest.json
          icons: [
            {
              src: '/icons/icon-192x192.png', // Ensure these paths are relative to the public folder or handled by your build
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
          categories: ['productivity', 'utilities'],
          // Screenshots and shortcuts need to be accessible via public paths
          // Ensure the paths in 'src' below are correct relative to your output directory or adjust as needed.
          screenshots: [
            {
              src: '/screenshots/screenshot1.png', // Example path, ensure these exist in public/screenshots
              sizes: '1280x800',
              type: 'image/png',
              form_factor: 'wide'
            },
            {
              src: '/screenshots/screenshot2.png', // Example path, ensure these exist in public/screenshots
              sizes: '750x1334',
              type: 'image/png',
              form_factor: 'narrow'
            }
          ],
          shortcuts: [
            {
              name: 'Add new task',
              short_name: 'Add task',
              description: 'Add a new task',
              url: '/add-task',
              icons: [{ src: '/icons/add-task.png', sizes: '192x192' }] // Ensure this icon exists
            },
            {
              name: "View today's tasks",
              short_name: 'Today',
              description: 'View tasks due today',
              url: '/today'
            }
          ]
        },
        workbox: {
          // These options are used when strategies: 'generateSW'
          // For 'injectManifest', Workbox configuration is primarily in your src/sw.js
          // However, globPatterns can still be useful for precaching assets not explicitly handled by your sw.js
          globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg}'], 
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // Cache for fonts.gstatic.com
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-gstatic-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true, 
          type: 'module',
          navigateFallback: 'index.html',
        },
      }),
    ],
  },
});