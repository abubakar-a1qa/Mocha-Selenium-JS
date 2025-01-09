const { expect } = require('chai');
const BasePage = require('./BasePage');
const { By, Actions } = require('selenium-webdriver');

class HomePage extends BasePage {
    constructor(driver) {
        super(driver); // Pass the driver instance to the BasePage
        // Define selectors
        this.communityMarketLocator = By.xpath("//div[@class='supernav_content']//a[contains(text(), 'Market')]");
        this.communityTabLocator = By.xpath("//a[contains(@class, 'menuitem') and contains(text(), 'COMMUNITY')]");
    }

    // Hover over the COMMUNITY tab and then click on the Community Market link
    async goToCommunityMarket() {
        const actions = this.driver.actions({ bridge: true }); // Create an Actions instance
        const communityTab = await this.waitForElementVisible(this.communityTabLocator); // Wait for the COMMUNITY tab to be visible

        await actions.move({ origin: communityTab }).perform();
        const communityMarketLink = await this.waitForElementVisible(this.communityMarketLocator);
        await communityMarketLink.click();
    }
}

module.exports = HomePage;