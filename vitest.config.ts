import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@momeng': fileURLToPath(new URL('./packages/momeng-ui/src', import.meta.url)),
      'momeng-ui': fileURLToPath(new URL('./packages/momeng-ui/src/index.ts', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['packages/momeng-ui/src/**/*.{ts,vue}'],
      exclude: ['**/__tests__/**', '**/index.ts'],
    },
  },
})
