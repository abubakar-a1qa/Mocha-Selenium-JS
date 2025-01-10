const { By } = require('selenium-webdriver');

module.exports = {
    showAdvancedOptionsDropdownLocator: By.xpath("//div[contains(@class, 'input_container')]"),
    searchCommunityMarketFormLocator: By.xpath("//div[@id='market_advancedsearch_dialog']"),
    allGamesDropdownLocator: By.xpath("//div[contains(@class, 'appselect') and contains(@id, 'market_advancedsearch_appselect')]"),
    gameNameLocator: (gameName) => `//div[contains(@class, 'popup_item') and contains(@class, 'market_advancedsearch_appname') and contains(., '${gameName}')]`,
    heroLocator: (heroName) => `//option[text()='${heroName}']`,
    rarityLocator: (rarityName) => `//div[contains(@class, 'econ_tag_filter_container')]//span[contains(text(), '${rarityName}')]/ancestor::label/preceding-sibling::input`,
    searchButtonLocator: By.xpath("//div[@class='btn_medium btn_green_white_innerfade']"),
    appliedFilterItemsLocator: (filterItemName) => `//a[contains(@class, 'market_searchedForTerm') and contains(., '${filterItemName}')]`,
    resultsTableItemsByIndexLocator: (itemIndex) => `//div[@id='searchResultsRows']//div[contains(@id, 'result_${itemIndex}')]`,
    resultsTableItemsByItemNameLocator: (itemIndex) => `//span[contains(@id, 'result_${itemIndex}')]`,
    resultItemPageTitleLocator: By.xpath("//div[contains(@class, 'market_listing_iteminfo')]//h1[contains(@class, 'hover_item_name')]"),
};