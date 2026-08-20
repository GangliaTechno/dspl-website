import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { configDefaults } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Dynamically discover published blog routes from generated manifest
let dynamicBlogRoutes = []
try {
  const manifestPath = path.resolve(__dirname, 'src/generated/blogManifest.json')
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    if (manifest.blogsEnabled && Array.isArray(manifest.posts)) {
      dynamicBlogRoutes = ['/blogs', ...manifest.posts.map((p) => `/blogs/${p.slug}`)]
    }
  }
} catch {
  dynamicBlogRoutes = []
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(__dirname, 'src/entry-prerender.jsx'),
      additionalPrerenderRoutes: [
        '/brands/raw-radicles',
        '/start',
        '/privacy',
        '/terms',
        '/404.html',
        ...dynamicBlogRoutes,
      ],
      previewMiddlewareFallback: '/404.html',
    }),
  ],
  build: {
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5174,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    exclude: [...configDefaults.exclude, '**/.worktrees/**'],
  },
})
