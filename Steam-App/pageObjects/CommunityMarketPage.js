const { expect } = require('chai');
const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

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
        this.priceSortLocator = By.xpath("//div[contains(@class, 'market_listing_right_cell') and contains(@class, 'market_listing_their_price') and contains(@class, 'market_sortable_column') and contains(@data-sorttype, 'price')]");
        this.priceTagLocator = By.xpath("//span[contains(@class, 'normal_price') and contains(text(), '$')]");
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
            expect(filterText).to.include(filterItemName);
        }
    }

    async clickOnPriceSortButton() {
        await this.click(this.priceSortLocator);
    }

    async isPriceSortedInAscendingOrder() {
        const priceTags = await this.driver.findElements(this.priceTagLocator);
        let sorted = true;

        for (let i = 0; i < priceTags.length - 1; i++) {
            const price1Text = await priceTags[i].getText();
            const price2Text = await priceTags[i + 1].getText();

            // Remove the currency symbol (like "$") and the "USD" text, then parse the remaining number
            const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, ''));
            const price2 = parseFloat(price2Text.replace(/[^0-9.-]+/g, ''));

            // Check if prices are not in ascending order
            if (price1 > price2) {
                sorted = false;
                break;
            }
        }

        return sorted;
    }

    async isPriceSortedInDescendingOrder() {
        const priceTags = await this.driver.findElements(this.priceTagLocator);
        let sorted = true;

        for (let i = 0; i < priceTags.length - 1; i++) {
            const price1Text = await priceTags[i].getText();
            const price2Text = await priceTags[i + 1].getText();

            // Clean the text to remove non-numeric characters and parse the price
            const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, ''));
            const price2 = parseFloat(price2Text.replace(/[^0-9.-]+/g, ''));

            // Check if prices are not in descending order
            if (price1 < price2) {
                sorted = false;
                break;
            }
        }

        return sorted;
    }
}

module.exports = CommunityMarketPage;
