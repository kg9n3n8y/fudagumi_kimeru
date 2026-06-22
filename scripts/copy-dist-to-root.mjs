import { cpSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const dist = join(root, 'dist')

const copyTargets = ['index.html', 'icon.png', 'manifest.webmanifest', 'sw.js']

rmSync(join(root, 'assets'), { recursive: true, force: true })

for (const file of copyTargets) {
  cpSync(join(dist, file), join(root, file))
}

cpSync(join(dist, 'assets'), join(root, 'assets'), { recursive: true })

for (const file of readdirSync(dist)) {
  if (file.startsWith('workbox-') && file.endsWith('.js')) {
    cpSync(join(dist, file), join(root, file))
  }
}

console.log('Copied dist/ to repository root for GitHub Pages.')
