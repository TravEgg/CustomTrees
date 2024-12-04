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
      return $(`input[id="name"`)
    }

    get inputEmailAddress() {
      return $('#email')
    }
    get ValueDD () {
      return $('#value')
    }

    get payPalBtn() {
      return $('img.paypal-logo.paypal-logo-paypal.paypal-logo-color-blue')
    }

    get errormsg() {
      return $('#my-error')
    }

    get iframe () {
      return $('iframe.iframe-content-element.iframe-content-block')
    }
    get iframePP () {
      return $('iframe.component-frame.visible')
    }
    get option125 () {
      return $('//option[contains(text(), "125")]')
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
        await browser.pause(1000);
        //load iframe to interact with input fields
        await browser.switchFrame(this.iframe)
        //Switch to next frame to click PayPal button
        await browser.switchFrame(this.iframePP)
        await expect(this.payPalBtn).toBeExisting();
        await this.payPalBtn.click();
        // Switch back to the ParentFrame
        await browser.switchToParentFrame();
        await browser.switchToParentFrame();
        await browser.switchFrame(this.iframe)
        await expect(this.errormsg).toBeExisting();
        await this.ValueDD.click();
        // await this.option125.click();
        await expect(this.inputUserName).toBeExisting();
        await this.inputUserName.setValue('Travis');
        await this.inputEmailAddress.setValue('tdogging@hotmail.com');
        await browser.switchToParentFrame();
        // await switch to child iframe
        await browser.switchFrame(this.iframe)
        await browser.switchFrame(this.iframePP)

        await expect(this.payPalBtn).toBeExisting();
        // await this.payPalBtn.click();
        // await expect(this.errormsg).toBeExisting();
        // Step 1: Store the current window handle
        const originalWindow = await browser.getWindowHandle();

        // Step 2: Perform the action that opens the new window
        await this.payPalBtn.click();

        // Step 3: Wait for the new window to appear
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 5000, // Timeout in milliseconds
                timeoutMsg: 'New window did not open within 5 seconds',
            }
        );

        // Step 4: Get all window handles
        const allWindows = await browser.getWindowHandles();

        // Step 5: Switch to the new window
        for (const handle of allWindows) {
            if (handle !== originalWindow) {
                await browser.switchToWindow(handle);
                break;
            }
        }

        // Step 6: Perform actions in the new window
        await browser.waitUntil(async () => {
          const url = await browser.getUrl();
          return url.includes('paypal');
      }, {
          timeout: 5000, // Timeout in milliseconds
          timeoutMsg: 'URL did not contain the expected text within the timeout'
      });
      await browser.switchToWindow(originalWindow);

        // await browser.switchToParentFrame();
        await browser.switchToParentFrame();
        await browser.switchToParentFrame();

      //   await browser.waitUntil(async () => {
      //     const url = await browser.getUrl();
      //     return url.includes('paypal');
      // }, {
      //     timeout: 5000, // Timeout in milliseconds
      //     timeoutMsg: 'URL did not contain the expected text within the timeout'
      // });

        // await expect(this.errormsg).toBeExisting();

        // await this.PassCreds('Travis', 'tdogging@hotmail.com');

        

        await browser.pause(2000);
      }

    
}
export default new GiftCertificates ();
