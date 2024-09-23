import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  build:{
    emptyOutDir: false,
    rollupOptions: {
      input: './src/contentScript/index.ts',
      output: {
        entryFileNames: (chunkInfo) => {
          return path.relative(
            'src',
            chunkInfo.facadeModuleId?.replace(/\.[^/.]+$/, ".js") ?? 'index.js'
          );
        },
      },
    }
  }
})
