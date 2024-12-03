import { $ } from '@wdio/globals'
import Base from './Base.js';
import {browser} from '@wdio/globals';
import TreesDD from './TreesDD.js';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class GiftCertificates extends Base {
    get giftCertificateLink() {
        return $('a[href="https://customfamilytreeart.com/gift-certificates"]');
    }

    get inputUserName() {
      return $('input#name')
    }

    get inputEmailAddress() {
      return $('input#email')
    }

    get payPalBtn() {
      return $('div[aria-label="PayPal"]')
    }

    get errormsg() {
      return $('#my-error')
    }

    // async PassCreds (username, email) {
    //   await this.inputUsername.setValue(username);
    //   await this.inputEmailAddress.setValue(email);
      // await this.payPalBtn.click();
  // };

    async giftTest () {
        await this.open();
       
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/',
            {
              timeout: 15000, // Timeout in milliseconds
              timeoutMsg: 'URL did not match the expected value within 5 seconds',
            }
          );

        await this.giftCertificateLink.click();
        await browser.waitUntil(
          async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/gift-certificates',
          {
            timeout: 5000, // Timeout in milliseconds
            timeoutMsg: 'URL did not match the expected value within 5 seconds',
          }
        );
        await browser.pause(5000);
        await this.inputUserName.setValue('Travis');
        await this.inputEmailAddress.setValue('tdogging@hotmail.com');


        // await this.payPalBtn().toBeExisting();
        // await this.payPalBtn[1].click();

        // await expect(this.errormsg).toBeExisting();

        // await this.PassCreds('Travis', 'tdogging@hotmail.com');

        

        await browser.pause(2000);
      }

    
}
export default new GiftCertificates ();
