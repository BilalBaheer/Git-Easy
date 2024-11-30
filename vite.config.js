import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          '@babel/plugin-transform-runtime'
        ],
        babelrc: false,
        configFile: false,
      }
    })
  ],
  resolve: {
    alias: {
      '@babel/runtime': '@babel/runtime/esm'
    }
  },
  optimizeDeps: {
    include: ['@babel/runtime/helpers/interopRequireDefault']
  }
})
