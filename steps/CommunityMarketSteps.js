const assert = require('assert');

class CommunityMarketSteps {
    constructor(driver) {
        this.communityMarketPage = new (require('../pageObjects/CommunityMarketPage'))(driver);
    }

    async openAdvancedSearchOptions() {
        await this.communityMarketPage.clickOnShowAdvancedOptionsDropdown();
        return this.communityMarketPage.isShowAdvancedOptionWindowVisible();
    }

    async searchForItem(gameName, heroName, rarityName) {
        await this.communityMarketPage.selectGame(gameName);
        await this.communityMarketPage.selectHero(heroName);
        await this.communityMarketPage.selectRarity(rarityName);
        await this.communityMarketPage.clickOnSearch();
    }

    async validateFilters(filterItems) {
        await this.communityMarketPage.isFilterApplied(filterItems);
    }

    async verifySearchResult(itemIndex) {
        const itemName = await this.communityMarketPage.getItemNameFromSearchResult(itemIndex);
        await this.communityMarketPage.clickOnSpecificSearchResultItem(itemIndex);
        const itemPageTitle = await this.communityMarketPage.getItemPageTitle();
        return itemName === itemPageTitle;
    }

    async getItemNamesFromResultList() {
        return this.communityMarketPage.getItemNamesFromResultList();
    }

    async clickOnPriceSortButton() {
        await this.communityMarketPage.clickOnPriceSortButton();
    }

    async waitForItemsToChange(initialResultList) {
        await this.communityMarketPage.waitForItemsToChange(initialResultList);
    }

    async verifyPriceSortedInAscendingOrder() {
        const isSorted = await this.communityMarketPage.isPriceSortedInAscendingOrder();
        assert(isSorted, 'Prices are not sorted in ascending order');
    }

    async verifyPriceSortedInDescendingOrder() {
        const isSorted = await this.communityMarketPage.isPriceSortedInDescendingOrder();
        assert(isSorted, 'Prices are not sorted in descending order');
    }
}

module.exports = CommunityMarketSteps;