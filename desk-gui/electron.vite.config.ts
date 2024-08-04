import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/main/index.ts')
        }
      }
    },
    plugins: [
      react(), 
      externalizeDepsPlugin(), 
      svgr({ 
        include: "**/*.svg", 
        svgrOptions: {plugins: ["@svgr/plugin-jsx"]}
      })
    ],
    resolve: {
      alias: {
        '@lib': resolve('src/main/lib'),
        '@shared': resolve('src/shared'),
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin(), svgr()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/preload/index.ts')
        }
      }
    },
  },
  renderer: {
    define: {
      'process.env': env
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/renderer/index.html')
        }
      }
    },
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
        '@renderer': resolve('src/renderer/src'),
        '@components': resolve('src/renderer/src/components'),
        '@assets': resolve('src/renderer/src/assets'),
        '@panels': resolve('src/renderer/src/panels'),
        '@utils': resolve('src/renderer/src/utils'),
      }
    },
    plugins: [react(), svgr()]
  }
}})
