import { fileURLToPath, URL } from 'node:url' // path helpers for alias reuse
import { defineConfig } from 'vitest/config' // Vitest config helper

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // match app alias in tests
    },
  },
  test: {
    exclude: ['e2e/**'], // keep Playwright specs out of Vitest
    environment: 'jsdom', // DOM APIs for React tests
    setupFiles: './src/setupTests.ts', // shared test setup
    globals: true, // allow describe/it/expect without imports
    coverage: { // minimal coverage report in test output
      provider: 'v8', // use @vitest/coverage-v8
      reporter: ['text'], // show summary in console
    },
  },
})
