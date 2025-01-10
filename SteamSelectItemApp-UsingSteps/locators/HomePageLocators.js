const { By } = require('selenium-webdriver');

module.exports = {
    communityMarketLocator: By.xpath("//div[@class='supernav_content']//a[contains(text(), 'Market')]"),
    communityTabLocator: By.xpath("//a[contains(@class, 'menuitem') and contains(text(), 'COMMUNITY')]"),
};