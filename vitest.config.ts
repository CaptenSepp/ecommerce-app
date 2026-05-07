import { fileURLToPath, URL } from 'node:url' // path helpers for alias reuse
import { defineConfig } from 'vitest/config' // Vitest config helper

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // match app alias in tests
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'api/**/*.{test,spec}.{js,ts}'], // test only app files
    exclude: ['node_modules/**', 'dist/**', 'e2e/**'], // skip deps, build, and e2e
    environment: 'jsdom', // DOM APIs for React tests
    setupFiles: './src/setupTests.ts', // shared test setup
    globals: true, // allow describe/it/expect without imports
    coverage: { // minimal coverage report in test output
      provider: 'v8', // use @vitest/coverage-v8
      reporter: ['text'], // show summary in console
      include: ['src/**/*.{ts,tsx}', 'api/**/*.{js,ts}'], // cover app source only
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}', 'api/**/*.test.{js,ts}', 'api/**/*.spec.{js,ts}', 'src/setupTests.ts', 'src/vite-env.d.ts', 'src/vitest-env.d.ts'], // skip test files
    },
  },
})
