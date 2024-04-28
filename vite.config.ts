import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: [
        'favicon.ico', 
        'apple-touch-icon.png', 
        'mask-icon.svg',
        'android-icon-144x144.png',
        'android-icon-192x192.png',
        'android-icon-36x36.png',
        'android-icon-48x48.png',
        'android-icon-72x72.png',
        'android-icon-96x96.png',
        'apple-icon-120x120.png',
        'apple-icon-144x144.png',
        'apple-icon-152x152.png',
        'apple-icon-180x180.png',
        'apple-icon-57x57.png',
        'apple-icon-60x60.png',
        'apple-icon-72x72.png',
        'apple-icon-76x76.png',
        'apple-icon-114x114.png',
        'apple-icon.png',
        'apple-icon-precomposed.png',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-96x96.png',
        'ms-icon-144x144.png',
        'ms-icon-150x150.png',
        'ms-icon-310x310.png',
        'ms-icon-70x70.png',
        'logo.png',
        'logo.svg',
        'vite.svg'
      ],
      registerType: 'autoUpdate',
      manifest: {
        name: 'star realms tracker',
        short_name: 'star realms tracker',
        description: 'star realms tracker',
        theme_color: '#1d232a',
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ],
})

