const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const HomePage = require('../pageObjects/HomePage');
const CommunityMarketPage = require('../pageObjects/CommunityMarketPage');
const assert = require('assert');

let driver;

describe('Steam Community Market', function () {
    let homePage;
    let communityMarketPage;

    // Set the timeout for the whole suite (in ms)
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite

    before(async function () {
        let options = new chrome.Options().addArguments('--start-maximized');
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build(); 
        await driver.manage().setTimeouts({ implicit: 10000 });

        homePage = new HomePage(driver);
        communityMarketPage = new CommunityMarketPage(driver);
        await homePage.open('https://store.steampowered.com/');
    });

    it('should perform all tests on Community Market', async function () {
        // Open Community Market page
        await homePage.goToCommunityMarket(); // Navigate to Community Market
        const currentUrl = await driver.getCurrentUrl();
        assert(currentUrl.includes('market')); // Verify if the URL contains 'market' using assert

        // Display advanced options window
        await communityMarketPage.clickOnShowAdvancedOptionsDropdown(); // Open advanced options
        const advancedOptionsVisible = await communityMarketPage.isShowAdvancedOptionWindowVisible(); // Check visibility of advanced options window
        assert(advancedOptionsVisible); // Verify it's visible using assert

        // Search for results with correct filters
        await communityMarketPage.selectGame('Dota 2'); // Select the game "Dota 2"
        await communityMarketPage.selectHero('Phantom Assassin'); // Select the hero "Phantom Assassin"
        await communityMarketPage.selectRarity('Rare'); // Select the rarity "Rare"
        await communityMarketPage.clickOnSearch(); // Click on the search button
        await communityMarketPage.isFilterApplied(['Dota 2', 'Phantom Assassin', 'Rare']); // Validate the filters
        
        // Click on the first item
        await communityMarketPage.clickOnSpecificSearchResultItem(0); // Click on the first item
    });

    after(async function () {
        this.timeout(5000);
        if (driver) {
            await driver.quit();
        }
    });
});