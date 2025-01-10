const { By, until } = require('selenium-webdriver');
const TimeOut = require('../utils/timeouts/TimeOut');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async click(locator) {
        const element = await this.waitForElementVisible(locator);
        await element.click();
    }

    async waitForElementVisible(locator, timeout = TimeOut.TenSeconds) {
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
    }

    async getText(locator) {
        const element = await this.waitForElementVisible(locator);
        return await element.getText();
    }
}

module.exports = BasePage;