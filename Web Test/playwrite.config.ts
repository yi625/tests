import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]], // never, always,  on-failure
  use: {
    screenshot: 'on', // Capture screenshots
    trace: 'on', 
  },
});