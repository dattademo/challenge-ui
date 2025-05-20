/**
 * PlanSelectPage class represents the page object model for the plan selection page.
 * It provides methods to interact with and validate elements on the plan selection page.
 */

import { timeouts } from '../tests/data/customTimeouts.js'; // Importing timeouts from a separate file.

export class PlanSelectPage {
    /**
     * Constructor for the PlanSelectPage class.
     * @param {import('@playwright/test').Page} page - The Playwright page object used to interact with the browser.
     */
    constructor(page) {
        this.page = page; // Playwright page object for browser interaction.
        this.TIMEOUT = timeouts.shortTimeout; // Default timeout for waiting for elements.

        // Locator for the "Continue" button on the plan selection page.
        this.continueButton = page.getByTestId('plan-select-continue-button');
    }

    /**
     * Selects a plan based on the provided plan number.
     * @param {number} planNumber - The number of the plan to be selected (e.g., 1, 2, 3).
     * @returns {Promise<void>} Resolves when the plan is selected.
     */
    async selectPlan(planNumber) {
        // Wait for the "Continue" button to be visible before interacting with the page.
        await this.continueButton.waitFor({ timeout: this.TIMEOUT });

        // Click the toggle button for the specified plan.
        await this.page.getByTestId(`plan-select-${planNumber}-toggle`).click();
    }

    /**
     * Clicks the "Continue" button to proceed to the next step.
     * @returns {Promise<void>} Resolves when the button is clicked.
     */
    async clickContinue() {
        await this.continueButton.click(); // Click the "Continue" button.
    }
}