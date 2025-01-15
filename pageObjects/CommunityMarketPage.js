const { By } = require('selenium-webdriver');
const assert = require('assert');
const BasePage = require('./BasePage');
const CommunityMarketPageLocators = require('../locators/CommunityMarketPageLocators');
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
            const isDisplayed = await filterElement.isDisplayed();
            if (!isDisplayed) {
                return false;
            }
        }
        return true;
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

    async isMarketTableListingMessageVisible() {
        try {
            const element = await this.driver.findElement(this.locators.marketTableListingMessage);
            return element.isDisplayed();
        } catch (e) {
            return false;
        }
    }

    /*async waitForItemsToChange(resultList) {
        let isChanged = false;

        while (!isChanged) {
            const updatedResultList = await this.getItemNamesFromResultList();
            isChanged = resultList.some((item, index) => item !== updatedResultList[index]);
        }
        return isChanged;
    }*/

    async waitForItemsToChange(resultList, maxRetries = 3, intervalTime = TimeOut.OneSecond) {
        let isChanged = false;
        let retries = 0;

        while (!isChanged && retries < maxRetries) {
            const updatedResultList = await this.getItemNamesFromResultList();
            isChanged = resultList.some((item, index) => item !== updatedResultList[index]);

            if (!isChanged) {
                retries++;
                await this.driver.sleep(intervalTime);
            }
        }

        return isChanged;
    }

    async isPriceSorted(order = 'ascending') {
        const priceTags = await this.driver.findElements(this.locators.priceTagLocator);
        const prices = [];
        for (const priceTag of priceTags) {
            const priceText = await priceTag.getText();
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
            prices.push(price);
        }
        const sortedPrices = [...prices].sort((a, b) => (order === 'ascending' ? a - b : b - a));
        return JSON.stringify(prices) === JSON.stringify(sortedPrices);
    }
}

module.exports = CommunityMarketPage;