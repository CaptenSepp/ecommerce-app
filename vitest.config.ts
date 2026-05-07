import { fileURLToPath, URL } from 'node:url' // path helpers for alias reuse
import { defineConfig } from 'vitest/config' // Vitest config helper

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // match app alias in tests
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'], // test only app unit files
    exclude: ['node_modules/**', 'dist/**', 'e2e/**'], // skip deps, build, and e2e
    environment: 'jsdom', // DOM APIs for React tests
    setupFiles: './src/setupTests.ts', // shared test setup
    globals: true, // allow describe/it/expect without imports
    coverage: { // minimal coverage report in test output
      provider: 'v8', // use @vitest/coverage-v8
      reporter: ['text'], // show summary in console
    },
  },
})
