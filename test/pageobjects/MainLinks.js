import Base from './Base.js';
import TreesDD from './TreesDD.js';

/**
 * Links on Main page 
 */
class MainPage extends Base {
    /**
     * Selectors 
     */
    get howItWorks () {
        return $('//span[contains(text(), "How It Works")]')
    }

    get nameForms() {
        return $('//a[contains(text(), "Name Forms")]')
    }

    get howItWorksPage() {
        return $('div[contains(text(), "What to Expect)]')
    }
    get prices() {
        return $('//span[contains(text(), "Prices")]')
    }

    get shipping() {
        return $('//span[contains(text(), "Shipping")]')
    }

    get privacyPolicy() {
        return $('//a[contains(text(), "Privacy Policy")]')
    }

    infoLinks = [
        { element: () => this.howItWorks, url: 'https://customfamilytreeart.com/how-it-works' },
        { element: () => this.nameForms, url: 'https://customfamilytreeart.com/name-forms' },
        { element: () => this.prices, url: 'https://customfamilytreeart.com/prices' },
        { element: () => this.shipping, url: 'https://customfamilytreeart.com/shipping' },
        { element: () => this.privacyPolicy, url: 'https://customfamilytreeart.com/privacy-policy'}
        ];

    async mainLinksTest () {
        await this.CustomTreeMain();
        // Open Main Page
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/',
            {
              timeout: 5000, // Timeout in milliseconds
              timeoutMsg: 'URL did not match the expected value within 5 seconds',
            }
          );
        
        //Loop through the Info Links and check that the page opens
        for (const link of this.infoLinks) {
          
            // Click the current menu option
                    await link.element().click();
          
            // Wait for the URL to match the expected value
                    await browser.waitUntil(
                        async () => (await browser.getUrl()) === link.url,
                        {
                            timeout: 5000, // Timeout in milliseconds
                            timeoutMsg: `URL did not match the expected value for ${link.url} within 5 seconds`,
                        }
                    );
          
            // Optionally, navigate back to the home page after each interaction
                    if (this.homePage) {
                        await this.homePage.click();
                    }
                }

    }
}

export default new MainPage();
