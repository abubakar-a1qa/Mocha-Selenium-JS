const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver; // Use the passed driver instance
    }

    // Navigate to the given URL
    async open(url) {
        await this.driver.get(url);
    }

    // Click a given element
    async click(locator) {
        const element = await this.waitForElementVisible(locator);
        await element.click();
    }

    // Wait for an element to be visible
    async waitForElementVisible(locator) {
        return await this.driver.wait(until.elementLocated(locator), 10000);
    }

    // Get the text of an element
    async getText(locator) {
        const element = await this.waitForElementVisible(locator);
        return await element.getText();
    }

    // Find elements and return an array
    async findElements(locator) {
        return await this.driver.findElements(locator);
    }
}

module.exports = BasePage;