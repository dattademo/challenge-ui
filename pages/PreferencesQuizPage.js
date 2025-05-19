/**
 * PreferencesQuizPage class represents the page object model for the preferences quiz page.
 * It provides methods to interact with and validate elements on the preferences quiz page.
 */
export class PreferencesQuizPage {
    /**
     * Constructor for the PreferencesQuizPage class.
     * @param {import('@playwright/test').Page} page - The Playwright page object used to interact with the browser.
     */
    constructor(page) {
        this.page = page; // Playwright page object for browser interaction.

        // Locator for the "Skip All" button on the preferences quiz page.
        this.skipAllButton = page.getByTestId('preferences-quiz-skip-all-button');

        // Regex to validate the URL. This ensures the page is in the correct state before interacting with it.
        this.URLRegexToWait = /.*coupon=cookieforlife&r=1&l=true.*/;
    }

    /**
     * Skips the preferences quiz by clicking the "Skip All" button.
     * Waits for the page URL to match the expected pattern before performing the action.
     * @returns {Promise<void>} Resolves when the "Skip All" button is clicked.
     */
    async skipAll() {
        // Wait for the URL to match the specified regex pattern.
        // This fails sometimes do to a weird redirect issue.
        await this.page.waitForURL(this.URLRegexToWait);

        // Click the "Skip All" button to skip the preferences quiz.
        await this.skipAllButton.click();
    }
}