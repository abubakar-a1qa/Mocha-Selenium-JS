const { assert } = require('chai');
const CommunityMarketPage = require('../pageObjects/CommunityMarketPage');

class CommunityMarketSteps {
    constructor(driver) {
        this.communityMarketPage = new CommunityMarketPage(driver);
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
        for (const filterItem of filterItems) {
            const isApplied = await this.communityMarketPage.isFilterApplied(filterItem);
            assert.isTrue(isApplied, `Filter ${filterItem} is not applied`);
        }
    }

    async verifySearchResult(itemIndex) {
        const isNoItemsMessageDisplayed = await this.communityMarketPage.isMarketTableListingMessageVisible();

        if (isNoItemsMessageDisplayed) {
            console.log("No items are available at Market listing table. Skipping the result verification.");
            return true;
        }

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

    async waitForItemsToChange(resultList) {
        await this.communityMarketPage.waitForItemsToChange(resultList);
    }

    async verifyPriceSorted(order) {
        const isSorted = await this.communityMarketPage.isPriceSorted(order);
        assert.isTrue(isSorted, `Prices are not sorted in ${order} order`);
    }
}

module.exports = CommunityMarketSteps;