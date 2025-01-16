const BasePage = require('./BasePage');
const HomePageLocators = require('../locators/HomePageLocators');

class HomePage extends BasePage {
    constructor(driver) {
        super(driver);
        this.locators = HomePageLocators;
    }

    async goToCommunityMarket() {
        const actions = this.driver.actions({ bridge: true });
        const communityTab = await this.waitForElementVisible(this.locators.communityTabLocator);
        await actions.move({ origin: communityTab }).perform();
        const communityMarketLink = await this.waitForElementVisible(this.locators.communityMarketLocator);
        await communityMarketLink.click();
    }
}

module.exports = HomePage;