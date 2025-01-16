const HomePage = require('../pageObjects/HomePage');

class HomePageSteps {
    constructor(driver) {
        this.homePage = new HomePage(driver);
    }

    async navigateToCommunityMarket() {
        await this.homePage.goToCommunityMarket();
    }
}

module.exports = HomePageSteps;