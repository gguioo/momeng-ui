import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.json',
      entryRoot: 'src',
      outDir: 'dist/types',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/__tests__/**'],
    }),
  ],
  resolve: {
    alias: { '@momeng': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.ts',
      name: 'MoMengUI',
      fileName: 'momeng-ui',
      cssFileName: 'momeng-ui',
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' }, exports: 'named' },
    },
  },
})
