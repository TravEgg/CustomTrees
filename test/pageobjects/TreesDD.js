import { $ } from '@wdio/globals'
import Base from './Base.js';
import { expect } from '@wdio/globals'
import MainLinks from './MainLinks.js';
import {browser} from '@wdio/globals'


/**
 * sub page containing specific selectors and methods for a specific page
 */
class TreesDD extends Base {
    /**
     * define selectors using getter methods
     */

    get treesDropDown() {
        return $('//span[contains(text(), "TREES")]');
    }

    get designChoice () {
        return $('//span[contains(text(), "Design Choices")]')
    }

    get treePage () {
        return $('a[href="https://customfamilyrtreeart.com"]')
    }

    get homePage() {
        return $('//span[contains(text(), "HOME")]')
    }
    
    get ancestryTrees() {
        return $('//div[contains(text(), "Ancestry")]')
    }

    get descendantTrees() {
        return $('//div[contains(text(), "Descendant")]')
    }

    get additionalDesigns() {
        return $('//div[contains(text(), "Additional")]')
    }

    get gallery() {
        return $('//div[contains(text(), "Gallery")]')
    }

    get pagetext() {
        return $('//div[contains(text(), "Your Family History")]')
    }
    ddOptions = ['Ancestry', 'Descendant', 'Additional', 'Gallery'];

    menuOptions = [
    { element: () => this.ancestryTrees, url: 'https://customfamilytreeart.com/ancestry-trees' },
    { element: () => this.descendantTrees, url: 'https://customfamilytreeart.com/descendant-trees' },
    { element: () => this.additionalDesigns, url: 'https://customfamilytreeart.com/additional-designs' },
    { element: () => this.gallery, url: 'https://customfamilytreeart.com/gallery' },
    ];
    

    // async initialBgColor() {
    //     const bgColor = await this.descendantsOption.getCSSProperty('background-color');
    //     return bgColor.value;
    // }

    // async hoverBgColor() {
    //     const bgColor = this.descendantsOption.getCSSProperty('background-color')
    //     return bgColor.value;
    // }


    /**
     * a method to encapsule automation code to interact with the page
     */
    async treesddtest () {
        await this.CustomTreeMain();
    // Define an array of menu options and their expected URLs
        for (const option of this.menuOptions) {
    // Move to the dropdown menu
            await this.treesDropDown.moveTo();
  
    // Click the current menu option
            await option.element().click();
  
    // Wait for the URL to match the expected value
            await browser.waitUntil(
                async () => (await browser.getUrl()) === option.url,
                {
                    timeout: 5000, // Timeout in milliseconds
                    timeoutMsg: `URL did not match the expected value for ${option.url} within 5 seconds`,
                }
            );
  
    // Optionally, navigate back to the home page after each interaction
            if (this.homePage) {
                await this.homePage.click();
            }
        }
        await this.treesDropDown.moveTo();
        await this.pagetext.moveTo();
        await this.pagetext.click()
        await expect(this.ancestryTrees).not.toBeExisting();
    }
  
        
 
    /**
     * overwrite specific options to adapt it to page object
     */
    CustomTreeMain () {
        return super.CustomTreeMain();
    }
}

export default new TreesDD();
