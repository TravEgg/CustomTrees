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
        // return $('.page-item.simple.state-displayed.items-list-item.items-list-weak2814.state-filtered.last-item');
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
        // await this.orderDropDown.click();
        await this.orderDropDown.moveTo();
        await  expect(this.orderOption).toBeExisting();
        await this.orderOption.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/order-a-tree',
            {
              timeout: 5000, // Timeout in milliseconds
              timeoutMsg: 'URL did not match the expected value within 5 seconds',
            }
          );
        await this.designChoice.moveTo();
        await this.clickDesign();
        await expect(this.ancestorOption).toBeExisting();
        // await this.descendantsOption.moveTo();
        // Store the initial background color
        const initialBgColor = await this.descendantsOption.getCSSProperty('background-color');

        // Perform hover action
        await this.descendantsOption.moveTo(); 
        // Store the hover background color
        const hoverBgColor = await this.descendantsOption.getCSSProperty('background-color');

        // Assert that the colors are not the same
        await expect(hoverBgColor.value).not.toBe(initialBgColor.value);

        await this.descendantsOption.click();
        const clickBgColor = await this.descendantsOption.getCSSProperty('background-color');
        await expect(clickBgColor.value).not.toBe(hoverBgColor.value);

        await this.ordertohomePage.click();
        // await this.orderDropDown.click();
        // await browser.waitUntil(
        //     async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/order',
        //     {
        //       timeout: 5000, // Timeout in milliseconds
        //       timeoutMsg: 'URL did not match the expected value within 5 seconds',
        //     }
        //   );
        await this.orderDropDown.moveTo();
        await expect(this.orderOption).toBeExisting();
        await this.orderOption.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/order-a-tree',
            {
              timeout: 5000, // Timeout in milliseconds
              timeoutMsg: 'URL did not match the expected value within 5 seconds',
            }
          );
        await this.designChoice.moveTo();
        await this.clickDesign();
        await this.ancestorOption.click();
        await this.ordertohomePage.click();
        await this.orderDropDown.moveTo();
        await this.giftOption.click();
        await expect(this.giftCertificateLink).toBeExisting();
        await this.homePage.click();
        await this.orderDropDown.moveTo();
        await this.updateOption.click();
        await expect(this.updatePage).toBeExisting();
        await this.homePage.click();
        await this.treesDropDown.moveTo();
        await this.treesDropDown.click();
        await this.ancestryTrees.click();
    }
}

export default new OrderPage();
