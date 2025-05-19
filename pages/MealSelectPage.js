/**
 * MealSelectPage class represents the page object model for the meal selection page.
 * It provides methods to interact with and validate elements on the page.
 */
export class MealSelectPage {

    /**
     * Constructor for the MealSelectPage class.
     * @param {import('@playwright/test').Page} page - The Playwright page object used to interact with the browser.
     */
    constructor(page) {
        this.page = page; // Playwright page object for browser interaction.

        // Properties to store page elements and text.
        this.mealSelectedText = null; // Placeholder for the meal selected text element.
        this.mealCards = null; // Placeholder for the meal cards elements.

        // Constants for text and selectors used on the page.
        this.selectedMealText = 'Meal selected 0/'; // Text to identify the selected meal status.
        this.mealCards = '[data-testid^="meal-card-"]'; // CSS selector for meal card elements.

        // Regex to validate the URL. This pattern is used to ensure the page is in the correct state.
        this.URLRegexToWait = /.*&r=1&l=true&countryCode=US&planSize=6&mealCategory=all.*/;
    }

    /**
     * Waits for the page URL to match the expected pattern and ensures meal cards are loaded.
     * @returns {Promise<void>} Resolves when the URL matches and meal cards are loaded.
     */
    async waitForURLToBeReady() {
        // Wait for the URL to match the specified regex pattern.
        await this.page.waitForURL(this.URLRegexToWait);

        // Fetch all meal card elements on the page and store them.
        this.mealCards = await this.page.$$(this.mealCards);
    }

    /**
     * Returns the element containing the text for the selected meal status.
     * @returns {import('@playwright/test').Locator} Locator for the selected meal text element.
     */
    returnMealSelectedText() {
        return this.page.getByText(this.selectedMealText);
    }
}