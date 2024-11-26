import { $ } from '@wdio/globals'
import Base from './Base.js';
import { expect } from '@wdio/globals'
import securePage from './secure.page.js';
import {browser} from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TreesDD {
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

    // async initialBgColor() {
    //     const bgColor = await this.descendantsOption.getCSSProperty('background-color');
    //     return bgColor.value;
    // }

    // async hoverBgColor() {
    //     const bgColor = this.descendantsOption.getCSSProperty('background-color')
    //     return bgColor.value;
    // }

    get ancestryTrees() {
        return $('//div[contains(text(), "Ancestry")]')
    }

    // usernames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using corect username and password and then again with a bad password
     */
    async treesddtest () {
        await this.open();
        await this.treesDropDown.moveTo();
        await this.treesDropDown.click();
        await this.ancestryTrees.click(); 
        
        
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
        


    }

 
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