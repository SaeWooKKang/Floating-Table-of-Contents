import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: './src/contentScript/index.ts',
      output: {
        entryFileNames: (chunkInfo) => {
          return path.relative(
            'src',
            chunkInfo.facadeModuleId?.replace(/\.[^/.]+$/, '.js') ?? 'index.js',
          )
        },
        assetFileNames: (assetInfo) => {
          const isCss = assetInfo.name?.endsWith('.css')
          const isContentScript = assetInfo.name?.startsWith('src/contentScript')

          if (isCss && !isContentScript) {
            return 'contentScript/index.css'
          }

          // default
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
