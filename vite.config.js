import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-runtime', {
            regenerator: true,
            corejs: 3,
            helpers: true,
            useESModules: true,
          }]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: ['@babel/runtime/helpers/interopRequireDefault']
  }
})
