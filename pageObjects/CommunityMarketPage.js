const BasePage = require('./BasePage');
const CommunityMarketPageLocators = require('../locators/CommunityMarketPageLocators');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const TimeOut = require("../utils/timeouts/TimeOut");

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
        return element.isDisplayed();
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
        return this.getText(By.xpath(this.locators.resultsTableItemsByItemNameLocator(itemIndex)));
    }

    async clickOnSpecificSearchResultItem(itemIndex) {
        await this.click(By.xpath(this.locators.resultsTableItemsByIndexLocator(itemIndex)));
    }

    async getItemPageTitle() {
        const element = await this.waitForElementVisible(this.locators.resultItemPageTitleLocator);
        return element.getText();
    }

    async getItemNamesFromResultList() {
        const itemNames = [];
        for (let i = 0; i <= 9; i++) {
            const itemName = await this.getText(By.xpath(this.locators.resultsTableItemsByItemNameLocator(i)));
            itemNames.push(itemName);
        }
        return itemNames;
    }

    async clickOnPriceSortButton() {
        await this.click(this.locators.priceSortLocator);
    }

    async waitForItemsToChange(initialResultList) {
        let isChanged = false;

        while (!isChanged) {
            const updatedResultList = await this.getItemNamesFromResultList();

            isChanged = initialResultList.some((item, index) => item !== updatedResultList[index]);

            if (isChanged) {
                return true;
            }
        }
        return false;
    }

    async isPriceSortedInAscendingOrder() {
        const priceTags = await this.driver.findElements(this.locators.priceTagLocator);
        let sorted = true;

        for (let i = 0; i < priceTags.length - 1; i++) {
            const price1Text = await priceTags[i].getText();
            const price2Text = await priceTags[i + 1].getText();

            // Remove non-numeric characters and parse as a float
            const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, ''));
            const price2 = parseFloat(price2Text.replace(/[^0-9.-]+/g, ''));

            // Check if prices are not in ascending order and not equal
            if (price1 > price2 && price1 !== price2) {
                sorted = false;
                break;
            }
        }
        return sorted;
    }

    async isPriceSortedInDescendingOrder() {
        const priceTags = await this.driver.findElements(this.locators.priceTagLocator);
        let sorted = true;

        for (let i = 0; i < priceTags.length - 1; i++) {
            const price1Text = await priceTags[i].getText();
            const price2Text = await priceTags[i + 1].getText();

            // Remove non-numeric characters and parse as a float
            const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, ''));
            const price2 = parseFloat(price2Text.replace(/[^0-9.-]+/g, ''));

            // Check if prices are not in descending order and not equal
            if (price1 < price2 && price1 !== price2) {
                sorted = false;
                break;
            }
        }
        return sorted;
    }
}

module.exports = CommunityMarketPage;