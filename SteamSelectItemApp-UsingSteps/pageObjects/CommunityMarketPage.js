const BasePage = require('./BasePage');
const CommunityMarketPageLocators = require('../locators/CommunityMarketPageLocators');
const { By } = require('selenium-webdriver');
const assert = require('assert');

class CommunityMarketPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.locators = CommunityMarketPageLocators;
    }

    async clickOnShowAdvancedOptionsDropdown() {
        await this.click(this.locators.showAdvancedOptionsDropdownLocator);
    }

    async isShowAdvancedOptionWindowVisible() {
        const element = await this.waitForElementVisible(this.locators.searchCommunityMarketFormLocator);
        return await element.isDisplayed();
    }

    async selectGame(gameName) {
        await this.click(this.locators.allGamesDropdownLocator);
        await this.click(By.xpath(this.locators.gameNameLocator(gameName)));
    }

    async selectHero(heroName) {
        await this.click(By.xpath(this.locators.heroLocator(heroName)));
    }

    async selectRarity(rarityName) {
        const checkbox = await this.driver.findElement(By.xpath(this.locators.rarityLocator(rarityName)));
        const isSelected = await checkbox.isSelected();
        if (!isSelected) {
            await checkbox.click();
        }
    }

    async clickOnSearch() {
        await this.click(this.locators.searchButtonLocator);
    }

    async isFilterApplied(filterItemNames) {
        for (const filterItemName of filterItemNames) {
            const filterLocator = By.xpath(this.locators.appliedFilterItemsLocator(filterItemName));
            const filterElement = await this.driver.findElement(filterLocator);
            const filterText = await filterElement.getText();
            assert(filterText.includes(filterItemName));
        }
    }

    async getItemNameFromSearchResult(itemIndex) {
        return await this.getText(By.xpath(this.locators.resultsTableItemsByItemNameLocator(itemIndex)));
    }

    async clickOnSpecificSearchResultItem(itemIndex) {
        await this.click(By.xpath(this.locators.resultsTableItemsByIndexLocator(itemIndex)));
    }

    async getItemPageTitle() {
        const element = await this.waitForElementVisible(this.locators.resultItemPageTitleLocator);
        return await element.getText();
    }
}

module.exports = CommunityMarketPage;