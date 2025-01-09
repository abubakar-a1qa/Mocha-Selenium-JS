const { assert } = require('chai');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const HomePage = require('../pageObjects/HomePage');
const CommunityMarketPage = require('../pageObjects/CommunityMarketPage');

let driver;

describe('Steam Community Market', function () {
    let homePage;
    let communityMarketPage;

    // Set the timeout for the whole suite (in ms)
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite

    before(async function () {
        let options = new chrome.Options().addArguments('--start-maximized');
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build(); // Initialize the driver globally
        await driver.manage().setTimeouts({ implicit: 10000 }); // Set implicit timeout

        homePage = new HomePage(driver);
        communityMarketPage = new CommunityMarketPage(driver); // Pass the driver instance
        await homePage.open('https://store.steampowered.com/'); // Open Steam Store
    });

    it('should perform all tests on Community Market', async function () {
        // Open Community Market page
        await homePage.goToCommunityMarket(); // Navigate to Community Market
        const currentUrl = await driver.getCurrentUrl();
        assert.include(currentUrl, 'market'); // Verify if the URL contains 'market'

        // Display advanced options window
        await communityMarketPage.clickOnShowAdvancedOptionsDropdown(); // Open advanced options
        const advancedOptionsVisible = await communityMarketPage.isShowAdvancedOptionWindowVisible(); // Check visibility of advanced options window
        assert.isTrue(advancedOptionsVisible); // Verify it's visible

        // Search for results with correct filters
        await communityMarketPage.selectGame('Dota 2'); // Select the game "Dota 2"
        await communityMarketPage.selectHero('Anti-Mage'); // Select the hero "Anti-Mage"
        await communityMarketPage.selectRarity('Uncommon'); // Select the rarity "Uncommon"
        await communityMarketPage.clickOnSearch(); // Click on the search button
        await communityMarketPage.isFilterApplied(['Dota 2', 'Anti-Mage', 'Uncommon']); // Validate the filters

        // Sort prices in ascending order
        await communityMarketPage.clickOnPriceSortButton(); // Click on the price sort button
        await driver.sleep(2000);
        const isSortedAsc = await communityMarketPage.isPriceSortedInAscendingOrder(); // Verify if prices are sorted in ascending order
        assert.isTrue(isSortedAsc); // Assert the prices are sorted in ascending order

        // Sort prices in descending order
        await communityMarketPage.clickOnPriceSortButton(); // Click on the price sort button again to sort in descending order
        await driver.sleep(2000);
        const isSortedDesc = await communityMarketPage.isPriceSortedInDescendingOrder(); // Verify if prices are sorted in descending order
        assert.isTrue(isSortedDesc); // Assert the prices are sorted in descending order
    });

    after(async function () {
        this.timeout(5000);
        if (driver) {
            await driver.quit();
        }
    });
});