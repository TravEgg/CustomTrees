import { $ } from '@wdio/globals'
import Base from './Base.js';
import { expect } from '@wdio/globals'
import {browser} from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrderPage extends Base {
    /**
     * define selectors using getter methods
     */
    get orderDropDown () {
        return $('//span[contains(text(), "ORDER")]');
    }

    get treesDropDown() {
        return $('//span[contains(text(), "TREES")]');
    }

    get orderOption () {
        return $('//div[contains(text(), "Order a Tree")]')
    }

    get updateOption() {
        return $('//div[contains(text(), "Update")]')
    }

    get giftOption() {
        return $('//div[contains(text(), "Gift")]')
    }

    get designChoice () {
        return $('//span[contains(text(), "Design Choices")]')
    }

    get descendantsOption () {
        return $('#imgOption-1');
    }

    get ancestorOption () {
        return $('#imgOption-0')
    }
    get ancestorRootsOption () {
        return $('#imgOption-2')
    }
    get descendantRootsOption () {
        return $('#imgOption-3')
    }
    get nextButton () {
        return $('#next')
    }
    get backButton () {
        return $('#back')
    }
    get treePage () {
        return $('a[href="https://customfamilyrtreeart.com"]')
    }

    get ordertohomePage() {
        return $('//a[contains(text(), "HOME")]')
    }
    get orderATree() {
        return $('#id1605371070800')
    }
    
    get homePage() {
        return $('//span[contains(text(), "HOME")]')
    }
    get updatePage() {
        return $('//span[contains(text(), "Updates")]')
    }
    get giftCertificateLink() {
        return $('a[href="https://customfamilytreeart.com/gift-certificates"]');
    }
    async clickDesign() {
        if (await this.designChoice.isExisting()) {
            await this.designChoice.click();
        } else if (await this.orderATree.isExisting()) {
            await this.orderATree.click();
        } else {
            console.log("Neither designChoice nor orderATree exists.");
        }
    }
    
    get optionTitle () {
        return $('#optionTitle')
    }
    
    get ancestryTrees() {
        return $('//div[contains(text(), "Ancestry")]')
    }

    async initialBgColor() {
        const bgColorInitial = await this.descendantsOption.getCSSProperty('background-color');
        return bgColorInitial.value;
    }

    async hoverBgColor() {
        const bgColorHover = this.descendantsOption.getCSSProperty('background-color')
        return bgColorHover.value;
    }


    /**
     * a method to encapsule automation code to interact with the page
     */
    async ordertest () {
        await this.CustomTreeMain();
        // expect drop down and click to open Order page
        await expect(this.orderDropDown).toBeExisting();
        await this.orderDropDown.moveTo();
        await  expect(this.orderOption).toBeExisting();
        await this.orderOption.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/order-a-tree',
            {
              timeout: 5000,
              timeoutMsg: 'URL did not match the expected value within 5 seconds',
            }
          );
          //Check if it opens to page with Choose Design before going to the Order page
        await this.designChoice.moveTo();
        await this.clickDesign();
        await expect(this.ancestorOption).toBeExisting();
        //Move focus before starting the test loop
        await this.descendantRootsOption.moveTo();
        //Set option names and elements for the Loop
        const options = [
            { name: 'Descendants', element: this.descendantsOption, },
            { name: 'Ancestor', element: this.ancestorOption, },
            { name: 'Ancestor Roots', element: this.ancestorRootsOption, },
            { name: 'Descendant Roots', element: this.descendantRootsOption, }
        ];
        //Loop to check the colors of background as each option is highlighted and clicked
        for (const option of options) {
            console.log(`Checking option: ${option.name}`);
    
            // Store the initial background color
            const initialBgColor = await option.element.getCSSProperty('background-color');
    
            // Perform hover action and get hover background color
            await option.element.moveTo();
            const hoverBgColor = await option.element.getCSSProperty('background-color');
    
            // Assert that the hover color is different from the initial color
            await expect(hoverBgColor.value).not.toBe(initialBgColor.value);
    
            // Click the element and get the background color after clicking
            await option.element.click();
            const clickBgColor = await option.element.getCSSProperty('background-color');
    
            // Assert that the clicked color is different from the hover color
            await expect(clickBgColor.value).not.toBe(hoverBgColor.value);
            console.log(`${option.name} clicked color: ${clickBgColor.value}`);
    
            // Navigate to the next and back buttons
            await this.nextButton.click();
            await this.ordertohomePage.moveTo();
            // Verify that the correct page is displayed
            await expect(this.optionTitle).toBeDisplayed();
            console.log(`${option.name} next page is displayed correctly.`);
            // go back to the main order page
            await this.backButton.click();
        }

        //return to the Home Page
        await this.ordertohomePage.click();
        //Check other links in order drop down
        await this.orderDropDown.moveTo();
        await this.giftOption.click();
        await expect(this.giftCertificateLink).toBeExisting();
        await this.homePage.click();
        await this.orderDropDown.moveTo();
        await this.updateOption.click();
        await expect(this.updatePage).toBeExisting();
        await this.homePage.click();
    }
}

export default new OrderPage();
