/**
 * LoginPage class represents the page object model for the login page.
 * It provides methods to interact with and validate elements on the login page.
 */

import { timeouts } from '../tests/data/customTimeouts.js'; // Importing timeouts from a separate file.

export class LoginPage {
    /**
     * Constructor for the LoginPage class.
     * @param {import('@playwright/test').Page} page - The Playwright page object used to interact with the browser.
     */
    constructor(page) {
        this.page = page; // Playwright page object for browser interaction.
        this.TIMEOUT = timeouts.shortTimeout; // Default timeout for waiting for elements.

        // Locators for elements on the login page.
        this.iHaveAnAccountButton = page.getByTestId('login'); // Locator for the "I have an account" button.
        this.loginWithEmailButton = page.getByTestId('login-form'); // Locator for the "Login with Email" button.
        this.emailInput = page.getByTestId('email'); // Locator for the email input field.
        this.passwordInput = page.getByTestId('password'); // Locator for the password input field.
        this.loginButton = page.getByTestId('submit-form'); // Locator for the "Login" button.
    }

    /**
     * Fills the login form with the provided username and password, and submits it.
     * @param {string} username - The email address or username to be entered in the email input field.
     * @param {string} password - The password to be entered in the password input field.
     * @returns {Promise<void>} Resolves when the login form is filled and submitted.
     */
    async fillLoginForm(username, password) {
        // Wait for the "I have an account" button to be visible.
        await this.iHaveAnAccountButton.waitFor({ timeout: this.TIMEOUT });

        // Click the "I have an account" button to proceed to the login form.
        await this.iHaveAnAccountButton.click();

        // Click the "Login with Email" button to open the email login form.
        await this.loginWithEmailButton.click();

        // Fill in the email and password fields with the provided credentials.
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);

        // Click the "Login" button to submit the form.
        await this.loginButton.click();
    }
}