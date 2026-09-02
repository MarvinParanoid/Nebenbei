import react from '@vitejs/plugin-react'
// From vitest/config, not vite: that is what knows about the `test` block.
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    // The suite covers pure logic and the content invariants. Interaction is
    // verified by driving the real app in a browser instead — that is where
    // timing, gestures and layout actually live.
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: ['./src/test-setup.ts'],
  },
})
