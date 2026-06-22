import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/fudagumi_kimeru/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icon.png'],
      manifest: {
        name: '組子 - 札組み作成',
        short_name: '組子',
        description: '競技かるたの札組みをランダムに決める',
        theme_color: '#336633',
        background_color: '#E1DAC3',
        display: 'standalone',
        start_url: '/fudagumi_kimeru/',
        scope: '/fudagumi_kimeru/',
        icons: [
          {
            src: 'icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
