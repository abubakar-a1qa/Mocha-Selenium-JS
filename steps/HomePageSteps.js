class HomePageSteps {
    constructor(driver) {
        this.homePage = new (require('../pageObjects/HomePage'))(driver);
    }

    async navigateToCommunityMarket() {
        await this.homePage.goToCommunityMarket();
    }
}

module.exports = HomePageSteps;