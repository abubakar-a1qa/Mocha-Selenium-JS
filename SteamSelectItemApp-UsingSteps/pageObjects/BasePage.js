const { By, until } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async open(url) {
        await this.driver.get(url);
    }

    async click(locator) {
        const element = await this.waitForElementVisible(locator);
        await element.click();
    }

    async waitForElementVisible(locator) {
        return await this.driver.wait(until.elementLocated(locator), 10000);
    }

    async getText(locator) {
        const element = await this.waitForElementVisible(locator);
        return await element.getText();
    }

    async findElements(locator) {
        return await this.driver.findElements(locator);
    }
}

module.exports = BasePage;