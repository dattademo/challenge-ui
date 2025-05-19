// @ts-check
import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';


const ENV = process.env.ENV || 'dev';
const envConfig = JSON.parse(fs.readFileSync(`./env/${ENV}.json`, 'utf-8'));

export default defineConfig({
  testDir: './tests',
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'playwright-report' }]], 
  
  timeout: envConfig.executionTimeout,
  
  use: {
    screenshot: 'only-on-failure',
    baseURL: envConfig.baseURL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { browserName: 'chromium', channel: 'chrome', colorScheme: 'dark', viewport: { width: 1800, height: 920 }, },
    },
  ],
});