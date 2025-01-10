const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const assert = require('assert');
const HomePageSteps = require('../steps/HomePageSteps');
const CommunityMarketSteps = require('../steps/CommunityMarketSteps');
const { baseUrl } = require('../resources/config');
const TimeOut = require('../utils/timeouts/TimeOut');

let driver;

describe('Steam Community Market', function () {
    let homePageSteps;
    let communityMarketSteps;

    this.timeout(TimeOut.ThirtySeconds);

    before(async function () {
        let options = new chrome.Options().addArguments('--start-maximized');
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await driver.manage().setTimeouts({ implicit: TimeOut.TenSeconds });

        // Navigate directly to the base URL
        await driver.get(baseUrl);

        homePageSteps = new HomePageSteps(driver);
        communityMarketSteps = new CommunityMarketSteps(driver);
    });

    it('Should perform all tests on Community Market', async function () {
        await homePageSteps.navigateToCommunityMarket();
        const currentUrl = await driver.getCurrentUrl();
        assert(currentUrl.includes('market'), 'Not on the Community Market page');

        const isAdvancedOptionsVisible = await communityMarketSteps.openAdvancedSearchOptions();
        assert(isAdvancedOptionsVisible, 'Advanced options window is not visible');

        await communityMarketSteps.searchForItem('Dota 2', 'Phantom Assassin', 'Rare');
        await communityMarketSteps.validateFilters(['Dota 2', 'Phantom Assassin', 'Rare']);

        const isResultValid = await communityMarketSteps.verifySearchResult(0);
        assert(isResultValid, 'Item title on the page does not match the result text');
    });

    after(async function () {
        this.timeout(TimeOut.FiveSeconds);
        if (driver) {
            await driver.quit();
        }
    });
});