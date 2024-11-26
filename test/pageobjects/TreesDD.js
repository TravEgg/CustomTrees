import { $ } from '@wdio/globals'
import Base from './Base.js';
import { expect } from '@wdio/globals'
import securePage from './secure.page.js';
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

    

    // usernames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using corect username and password and then again with a bad password
     */
    async treesddtest () {
        await this.open();
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
  
        // await this.treesDropDown.moveTo();
        // await this.treesDropDown.click();
        // await this.ancestryTrees.click(); 
        // await browser.waitUntil(
        //     async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/ancestry-trees',
        //     {
        //       timeout: 5000, // Timeout in milliseconds
        //       timeoutMsg: 'URL did not match the expected value within 5 seconds',
        //     }
        //   );          
        // await this.treesDropDown.moveTo();
        // await this.descendantTrees.click();
        // await browser.waitUntil(
        //     async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/descendant-trees',
        //     {
        //       timeout: 5000, // Timeout in milliseconds
        //       timeoutMsg: 'URL did not match the expected value within 5 seconds',
        //     }
        //   );
        //   await this.homePage.click();
        //   await this.treesDropDown.moveTo();
        //   await this.additionalDesigns.click();

        //   await browser.waitUntil(
        //     async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/additional-designs',
        //     {
        //       timeout: 5000, // Timeout in milliseconds
        //       timeoutMsg: 'URL did not match the expected value within 5 seconds',
        //     }
        //   );
        //   await this.homePage.click();
        //   await this.treesDropDown.moveTo();
        //   await this.gallery.click();

        //   await browser.waitUntil(
        //     async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/gallery',
        //     {
        //       timeout: 5000, // Timeout in milliseconds
        //       timeoutMsg: 'URL did not match the expected value within 5 seconds',
        //     }
        //   );

        
        
        //await expect(this.treePage).toBeExisting();
        // await expect(this.orderDropDown).toBeExisting();
        // await this.orderDropDown.click();
        // await  expect(this.orderOption).toBeExisting();
        // await this.orderOption.click();
        // await this.clickDesign();
        // await expect(this.ancestorOption).toBeExisting();
        // await this.descendantsOption.moveTo();
        // //await expect(this.hoverBgColor.value).not.ToBe(this.initialBgColor.value);
        // await this.descendantsOption.click();
        // await browser.back();
        // await this.clickDesign();
        // await this.ancestorOption.click();
        // await browser.back();
        // await this.homePage.click();
        // await this.orderDropDown.click();
        // await this.giftOption.click();
        // await this.homePage.click();
        // await this.orderDropDown.click();
        // await this.updateOption.click();
        


    

 
//         await this.inputPassword.setValue(password);
//         await this.btnSubmit.click();
//     }

//     async badLogin (username, badPassword) {
//         await this.inputUsername.setValue(username);
//         await this.inputPassword.setValue(badPassword);
//         await this.btnSubmit.click();
//     }
// //Positive Loop for all user logins 
//     async loginLoop (password) {
//         for (let i = 0; i < this.usernames.length; i++){
//         await this.open()
//         await this.login(this.usernames[i], password);
//             if (this.usernames[i]=='locked_out_user') {
//             await expect(securePage.errorPopup).toBeExisting()
//             await expect(securePage.errorPopup).toHaveText(
//             expect.stringContaining('Epic sadface: Sorry, this user has been locked out'))
//         }
//             else {
//             await expect(securePage.productPage).toBeExisting()
//             await expect(securePage.productPage).toHaveText(
//             expect.stringContaining('Swag Labs'))
//         }
//     }
// }
// //Negative Loop for all user logins using a bad password
//     async badLoginLoop (password) {
//         for (let i = 0; i < this.usernames.length; i++){
//         await securePage.open()
//         await this.badLogin(this.usernames[i], password);
//         await expect(securePage.errorPopup).toBeExisting()
//         await expect(securePage.errorPopup).toHaveText(
//             expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
//     }
// }
// dynamic selectors
// async MenuLinks (linkoption) {
//     return $(`[href="http://customfamilytreeart.com/${linkoption}"]`)
// }        
// await this.MenuLinks('prints').click();
// await this.MenuLinks('forms').click()
 
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

export default new TreesDD();
