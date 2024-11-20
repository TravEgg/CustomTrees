import { $ } from '@wdio/globals'
import Base from './Base.js';
import { expect } from '@wdio/globals'
import securePage from './secure.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrderPage extends Base {
    /**
     * define selectors using getter methods
     */
    get OrderDropDown () {
        return $('#id1732114078862');
    }

    // get inputPassword () {
    //     return $('#password');
    // }

    // get btnSubmit () {
    //     return $('input[type="submit"]');
    // }

    // usernames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using corect username and password and then again with a bad password
     */
    async ordertest () {
        await this.OrderDropDown.click();
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
        


    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

export default new OrderPage();
