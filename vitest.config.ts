import { defineConfig } from 'vitest/config' // Vitest config helper

export default defineConfig({
  test: {
    environment: 'jsdom', // DOM APIs for React tests
    setupFiles: './src/setupTests.ts', // shared test setup
    globals: true, // allow describe/it/expect without imports
    coverage: { // minimal coverage report in test output
      provider: 'v8', // use @vitest/coverage-v8
      reporter: ['text'], // show summary in console
    },
  },
})
