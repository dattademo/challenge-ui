/**
 * End-to-end test for the Meal Select Page.
 * Verifies navigation through the flow, meal card display, URL correctness, and selected meal text.
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { PreferencesQuizPage } from '../../pages/PreferencesQuizPage.js';
import { PlanSelectPage } from '../../pages/PlanSelectPage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { MealSelectPage } from '../../pages/MealSelectPage.js';
import { testData } from '../data/testData.js';

test.describe('Meal Select Page', () => {

  test('Selected meals, Meals cards and URL are correct', async ({ page }) => {

    // Navigate through the flow: Home -> Preferences Quiz -> Plan Select -> Login -> Meal Select
    let homePage = new HomePage(page);
    await homePage.goto();
    await homePage.fillZipCode(testData.zipCode);
    await homePage.clickOrderNow();

    let preferencesQuizPage = new PreferencesQuizPage(page);
    await preferencesQuizPage.skipAll();

    let planSelectPage = new PlanSelectPage(page);
    await planSelectPage.selectPlan(testData.planNumber);
    await planSelectPage.clickContinue();

    let loginPage = new LoginPage(page);
    await loginPage.fillLoginForm(testData.user.email, testData.user.password);

    let mealSelectPage = new MealSelectPage(page);
    await mealSelectPage.waitForURLToBeReady();

    // Assertions for meal cards, URL, and selected meal text
    expect(mealSelectPage.mealCards?.length).toBeGreaterThan(testData.expectedMinimumMeals);
    expect(page.url()).toContain(testData.expectedMealURLFragment);
    await expect(mealSelectPage.returnMealSelectedText()).toContainText(testData.expectedMealSelectedText);

  });
});