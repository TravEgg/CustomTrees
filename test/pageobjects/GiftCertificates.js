import { $ } from '@wdio/globals'
import Base from './Base.js';
import {browser} from '@wdio/globals';
import TreesDD from './TreesDD.js';
import MainLinks from './MainLinks.js';


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
      return $('div[role="link"].paypal-button-number-0')
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
    get option25 () {
      return $('//option[contains(text(), "25")]')
    }
    get option50 () {
      return $('//option[contains(text(), "50")]')
    }
    get option75 () {
      return $('//option[contains(text(), "75")]')
    }
    get option100 () {
      return $('//option[contains(text(), "100")]')
    }
    get option125 () {
      return $('//option[contains(text(), "125")]')
    }
    get option150 () {
      return $('//option[contains(text(), "150")]')
    }
    get option175 () {
      return $('//option[contains(text(), "175")]')
    }
    get option200 () {
      return $('//option[contains(text(), "200")]')
    }
    get option225 () {
      return $('//option[contains(text(), "225")]')
    }
    get option250 () {
      return $('//option[contains(text(), "250")]')
    }
    get option275 () {
      return $('//option[contains(text(), "275")]')
    }
    get option300 () {
      return $('//option[contains(text(), "300")]')
    }

    
    async giftTest () {
      // Array of options
  const options = [
  this.option50,
  this.option75,
  this.option100,
  this.option125,
  this.option150,
  this.option175,
  this.option200,
  this.option225,
  this.option250,
  this.option275,
  this.option300,
  this.option25
];
        await this.CustomTreeMain();
       
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
        await MainLinks.howItWorks.waitForExist({timeout: 5000});
        await MainLinks.howItWorks.moveTo();
        await this.iframe.waitForExist({ timeout: 5000 });
        await this.iframe.waitForDisplayed({ timeout: 5000 });
        //load iframe to interact with input fields
        await this.iframe.moveTo();
        await browser.switchFrame(this.iframe);
        await browser.switchToParentFrame();
        await browser.switchFrame(this.iframe);
        await this.inputEmailAddress.waitForExist({timeout: 5000});
        await this.inputEmailAddress.waitForDisplayed({timeout: 5000});
        //Switch to next frame to click PayPal button
        await this.iframePP.waitForExist({ timeout: 5000 });
        await this.iframePP.waitForDisplayed({ timeout: 5000 });
        await browser.switchFrame(this.iframePP);
        await expect(this.payPalBtn).toBeExisting();
        await this.payPalBtn.click();
        // Switch back to the ParentFrame
        await browser.switchToParentFrame();
        await browser.switchToParentFrame();
        await browser.switchFrame(this.iframe)
        await expect(this.errormsg).toBeExisting();
        for (const option of options) {
          await this.ValueDD.click(); // Click the dropdown
          await option.click();       // Select the current option
      }
        await expect(this.inputUserName).toBeExisting();
        // Selector for the input field
        const inputNameField = await this.inputUserName;
        const errorMessage = await this.errormsg;

        // Function to generate a random string of given length
        function getRandomString(length) {
          // !@#$%^&*()_+0123456789
            const baseCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?0123456789';
            let result = '';
            for (let i = 1; i < length; i++) {
              const charSet = i >= 3 ? baseCharacters + specialCharacters : baseCharacters;

              // Randomly select a character from the current set
              const randomIndex = Math.floor(Math.random() * charSet.length);
              result += charSet[randomIndex];
            }
            return result;
        }
        function getRandomEmail(localLength, domainLength, tldLength) {
          const baseCharacters1 = 'abcdefghijklmnopqrstuvwxyz';
          const specialCharacters1 = '0123456789';
      
          // Helper to generate a random string from a given character set
          const getRandomFromSet = (length, charSet) => {
              let result = '';
              for (let i = 0; i < length; i++) {
                  const randomIndex = Math.floor(Math.random() * charSet.length);
                  result += charSet[randomIndex];
              }
              return result;
          };
      
          // Generate email parts
          const localPart = getRandomFromSet(localLength, baseCharacters1 + specialCharacters1); // characters before @
          const domainPart = getRandomFromSet(domainLength, baseCharacters1); // characters for domain
          const tld = getRandomFromSet(tldLength, baseCharacters1); // 2 characters for TLD
      
          // Combine parts to form the email
          return `${localPart}@${domainPart}.${tld}`;
      }
      
        // function setting what is considered valid
        function isValidInput(input) {
          return input.length >= 2 && input.length <= 100;
        }

        // Loop to add random letters progressively
        for (let i = 1; i <= 10; i++) {
            // Generate a random string of `i` letters
            const valueToEnter = getRandomString(i);

            // Clear the input field
            await inputNameField.setValue(''); // Ensure it's blank

            // Enter the new value
            await inputNameField.setValue(valueToEnter);
            
            // Determine if the input is valid
            if (isValidInput(valueToEnter)) {
              // Wait for the error message to display
              await errorMessage.waitForDisplayed({ timeout: 5000 });
              const displayedMessage = await errorMessage.getText();

              // Validate the expected message for valid input
              expect(displayedMessage).toBe('Please enter a valid email.');
              console.log(`Iteration ${i}: '${valueToEnter}' is valid. Message: '${displayedMessage}'`);
            } 
            // else if (valueToEnter === ' ') {
            //   // Handle blank input case
            //   console.log(`Iteration ${i}: Blank input entered`);
            //   // Wait for error message to display
            //   await errorMessage.waitForDisplayed({ timeout: 5000 });
            //   const displayedMessage = await errorMessage.getText();
            //   await expect(errorMessage).toBe('Please enter a valid name and email.');
            //   console.log(`Iteration ${i}: '${valueToEnter}' is invalid. Message: '${displayedMessage}'`);
            // }
            else {
              // Wait for the error message to display
              await errorMessage.waitForDisplayed({ timeout: 5000 });
              const displayedMessage = await errorMessage.getText();

              // Validate the expected message for invalid input
              expect(displayedMessage).toBe('Please enter a valid name and email.'); 
              console.log(`Iteration ${i}: '${valueToEnter}' is invalid. Message: '${displayedMessage}'`);
            }
          
        }

        await inputNameField.setValue('t');
        const inputEmailField = await this.inputEmailAddress;
        // Clear the input field
        await inputEmailField.clearValue(); // Ensure it's blank
        function isValidEmailFormat(inputEmailField) {
          const emailRegex = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
          return emailRegex.test(inputEmailField);
      }
        for (let i = 1; i <= 10; i++) {
          // Generate a random email Start with 0 characters for each part and increment by 1 for each iteration 

          const valueToEnterEmail = getRandomEmail(0 + i, 0 + i, 0 + Math.floor(i / 2));
          console.log(`Iteration ${i}: ${valueToEnterEmail}`);
          const emailCheck = isValidEmailFormat(valueToEnterEmail);
      
          // Enter the new value
          await inputEmailField.setValue(valueToEnterEmail);
          
          // Wait for the error message to display
          await errorMessage.waitForDisplayed({ timeout: 5000 });
          const displayedMessage1 = await errorMessage.getText();
      
          // Determine if the input is valid
          if (emailCheck) {
              // Validate the expected message for valid input
              expect(displayedMessage1).toBe('You must fill out your name!');
              console.log(`Iteration ${i}: '${valueToEnterEmail}' is valid. Message: '${displayedMessage1}'`);
          } else {
              // Validate the expected message for invalid input
              expect(displayedMessage1).toBe('Please enter a valid name and email.');
              console.log(`Iteration ${i}: '${valueToEnterEmail}' is invalid. Message: '${displayedMessage1}'`);
          }
      }
      

        // await this.inputUserName.setValue('Travis');
        await this.inputUserName.setValue('Travis')
        await this.inputEmailAddress.setValue('tdogging@hotmail.com');


        await browser.switchToParentFrame();
        // await switch to child iframe
        await browser.switchFrame(this.iframe)
        await browser.switchFrame(this.iframePP)

        await expect(this.payPalBtn).toBeExisting();
        
        // Store the current window handle
        const originalWindow = await browser.getWindowHandle();

        // Perform the action that opens the new window
        await this.payPalBtn.click();

        // Wait for the new window to appear
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 5000, // Timeout in milliseconds
                timeoutMsg: 'New window did not open within 5 seconds',
            }
        );

        // Get all window handles
        const allWindows = await browser.getWindowHandles();

        // Switch to the new window
        for (const handle of allWindows) {
            if (handle !== originalWindow) {
                await browser.switchToWindow(handle);
                break;
            }
        }


        // Perform actions in the new window
        await browser.waitUntil(() => browser.getUrl().then(url => url.includes('paypal')),
        {
            timeout: 10000, // Timeout in milliseconds
            timeoutMsg: 'URL did not contain the expected text within the timeout'
        });
      // Switch back to the original Window
      await browser.switchToWindow(originalWindow);

        // await browser.switchToParentFrame();
        await browser.switchToParentFrame();
        await browser.switchToParentFrame();

      }

    
}
export default new GiftCertificates ();
