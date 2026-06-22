import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const base = '/fudagumi_kimeru/docs/'

export default defineConfig({
  base,
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'app.html'),
      },
    },
  },
  server: {
    open: base,
  },
  preview: {
    open: base,
  },
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
        start_url: base,
        scope: base,
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
