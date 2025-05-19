/**
 * HomePage class represents the page object model for the home page.
 * It provides methods to interact with and validate elements on the home page.
 */
export class HomePage {
    /**
     * Constructor for the HomePage class.
     * @param {import('@playwright/test').Page} page - The Playwright page object used to interact with the browser.
     */
    constructor(page) {
        this.MODAL_TIMEOUT = 35000; // Default timeout for modal operations.
        this.MODAL_EXIT_TIMEOUT = 3000; // Timeout for waiting for the modal to be removed from the DOM.

        this.page = page; // Playwright page object for browser interaction.

        // Locators for elements on the home page.
        this.modal = page.locator('.ReactModal__Content--after-open'); // Locator for the promotional modal.
        this.modalCloseButton = page.getByRole('button', { name: 'Close modal' }); // Locator for the modal close button.
        this.zipCodeInput = page.getByTestId('hero-vertical-slider-text-column').getByTestId('funnel-start-form-zipcode-input'); // Locator for the zip code input field.
        this.orderNowWithZipCodeButton = page.getByTestId('hero-vertical-slider-text-column').getByRole('button', { name: 'Order Now' }); // Locator for the "Order Now" button.
    }

    /**
     * Navigates to the home page and dismisses the promotional modal if it is present.
     * @returns {Promise<void>} Resolves when the navigation and modal dismissal are complete.
     */
    async goto() {
        await this.page.goto('/'); // Navigate to the home page.
        await this.dismissPromoModalIfPresent(); // Dismiss the promotional modal if it appears.
    }

    /**
     * Dismisses the promotional modal if it is present on the page.
     * @returns {Promise<void>} Resolves when the modal is dismissed or if it is not present.
     */
    async dismissPromoModalIfPresent() {
        try {
            // Wait for the modal to appear with a timeout of 35 seconds.
            await this.modal.waitFor({ timeout: this.MODAL_TIMEOUT });

            // If the modal is visible, click the close button and wait for it to disappear.
            if (await this.modal.isVisible()) {
                await this.modalCloseButton.click(); // Close the modal.
                await this.modal.waitFor({ state: 'detached', timeout: this.MODAL_EXIT_TIMEOUT }); // Wait for the modal to be removed from the DOM.
            }
        } catch (err) {
            // Log a message if the modal is not found or already closed.
            console.log('Modal not found or already closed');
        }
    }

    /**
     * Fills the zip code input field with the provided zip code.
     * @param {string} zipCode - The zip code to be entered in the input field.
     * @returns {Promise<void>} Resolves when the zip code is filled.
     */
    async fillZipCode(zipCode) {
        await this.zipCodeInput.fill(zipCode); // Fill the zip code input field with the provided value.
    }

    /**
     * Clicks the "Order Now" button to proceed with the order.
     * @returns {Promise<void>} Resolves when the button is clicked.
     */
    async clickOrderNow() {
        await this.orderNowWithZipCodeButton.click(); // Click the "Order Now" button.
    }
}