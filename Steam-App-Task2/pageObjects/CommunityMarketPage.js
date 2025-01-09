const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');
const assert = require('assert');

class CommunityMarketPage extends BasePage {
    constructor(driver) {
        super(driver); // Pass the driver instance to the BasePage
        // Define selectors for elements on the Community Market page
        this.mainContentsLocator = By.id('mainContents'); // Locator for main contents in market page
        this.sidebarContentsLocator = By.xpath("//div[contains(@class, 'sidebar_contents')]");
        this.showAdvancedOptionsDropdownLocator = By.xpath("//div[contains(@class, 'input_container')]");
        this.searchCommunityMarketFormLocator = By.xpath("//div[@id='market_advancedsearch_dialog']");
        this.allGamesDropdownLocator = By.xpath("//div[contains(@class, 'appselect') and contains(@id, 'market_advancedsearch_appselect')]");
        this.gameNameLocator = (gameName) => `//div[contains(@class, 'popup_item') and contains(@class, 'market_advancedsearch_appname') and contains(., '${gameName}')]`;
        this.heroLocator = (heroName) => `//option[text()='${heroName}']`;
        this.rarityLocator = (rarityName) => `//div[contains(@class, 'econ_tag_filter_container')]//span[contains(text(), '${rarityName}')]/ancestor::label/preceding-sibling::input`;
        this.searchButtonLocator = By.xpath("//div[@class='btn_medium btn_green_white_innerfade']");
        this.appliedFilterItemsLocator = (filterItemName) => `//a[contains(@class, 'market_searchedForTerm') and contains(., '${filterItemName}')]`;
        this.resultsTableItemsByIndexLocator = (itemIndex) => `//div[@id='searchResultsRows']//div[contains(@id, 'result_${itemIndex}')]`;
    }

    async isMarketPageVisible() {
        const element = await this.waitForElementVisible(this.mainContentsLocator);
        return await element.isDisplayed();
    }

    async clickOnShowAdvancedOptionsDropdown() {
        await this.click(this.showAdvancedOptionsDropdownLocator);
    }

    async isShowAdvancedOptionWindowVisible() {
        const element = await this.waitForElementVisible(this.searchCommunityMarketFormLocator);
        return await element.isDisplayed();
    }

    async selectGame(gameName) {
        await this.click(this.allGamesDropdownLocator);
        await this.click(By.xpath(this.gameNameLocator(gameName)));
    }

    async selectHero(heroName) {
        await this.click(By.xpath(this.heroLocator(heroName)));
    }

    async selectRarity(rarityName) {
        const checkbox = await this.driver.findElement(By.xpath(this.rarityLocator(rarityName))); // Locate the checkbox
        const isSelected = await checkbox.isSelected(); // Check if it's already selected
        if (!isSelected) {
            await checkbox.click(); // Select the checkbox only if it's not already selected
        }
    }

    async clickOnSearch() {
        await this.click(this.searchButtonLocator);
    }

    async isFilterApplied(filterItemNames) {
        for (const filterItemName of filterItemNames) {
            const filterLocator = By.xpath(this.appliedFilterItemsLocator(filterItemName));
            const filterElement = await this.driver.findElement(filterLocator);
            const filterText = await filterElement.getText();
            assert(filterText.includes(filterItemName)); 
        }
    }

    async clickOnPriceSortButton() {
        await this.click(this.priceSortLocator);
    }

    async clickOnSpecificSearchResultItem(itemIndex) {
        await this.click(By.xpath(this.resultsTableItemsByIndexLocator(itemIndex)));
    }
}

module.exports = CommunityMarketPage;