import Base from './Base.js';
import TreesDD from './TreesDD.js';
import MainLinks from './MainLinks.js';


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
  get payLaterBtn() {
    return $('div[role="link"].paypal-button-number-1')
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
  
  dropDownValues = ['50', '75', '100', '125', '150', '175', '200', '225', '250', '275', '300']
  dropDownOption(value) {
    return $(`//option[contains(text(), "${value}")]`);
  }

  async selectOptions() {
    for (const value of this.dropDownValues) {

      await this.ValueDD.click(); 

      const option = await this.dropDownOption(value);

      if (await option.isDisplayed()) {
        await option.click();
      } else {
        console.error(`Option ${value} is not displayed.`);
      }
    }
  }

  async nameValidation () {

    await expect(this.inputUserName).toBeExisting();

    const inputNameField = await this.inputUserName;
    const errorMessage = await this.errormsg;

    function getRandomString(length) {
        const baseCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?0123456789';
        let result = '';
        for (let i = 1; i < length; i++) {
          const charSet = i >= 3 ? baseCharacters + specialCharacters : baseCharacters;
          const randomIndex = Math.floor(Math.random() * charSet.length);
          result += charSet[randomIndex];
        }
        return result;
    }

    function isValidInput(input) {
      const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
  
      if (input.length < 2 || input.length > 100) {
          return false;
      }
  
      const firstTwoSpecial = specialCharacters.test(input[0]) && specialCharacters.test(input[1]);
      
      const firstThree = input.slice(0, 3);
      const specialCount = [...firstThree].filter(char => specialCharacters.test(char)).length;
  
      return !(firstTwoSpecial || specialCount >= 2);
    }

    for (let i = 0; i <= 10; i++) {

      const valueToEnter = getRandomString(i);

      await inputNameField.setValue('');

      await inputNameField.setValue(valueToEnter);

      if (isValidInput(valueToEnter)) {
        await errorMessage.waitForDisplayed({ timeout: 5000 });
        const displayedMessage = await errorMessage.getText();

        expect(displayedMessage).toBe('Please enter a valid email.');
        console.log(`Iteration ${i}: '${valueToEnter}' is valid. Message: '${displayedMessage}'`);
      } 
      else {
        await errorMessage.waitForDisplayed({ timeout: 5000 });
        const displayedMessage = await errorMessage.getText();

        expect(displayedMessage).toBe('Please enter a valid name and email.'); 
        console.log(`Iteration ${i}: '${valueToEnter}' is invalid. Message: '${displayedMessage}'`);
      }
    
    }
    await inputNameField.setValue('t');
  }
  async emailValidation () {
    function getRandomEmail(localLength, domainLength, tldLength) {
      const baseCharacters1 = 'abcdefghijklmnopqrstuvwxyz';
      const specialCharacters1 = '0123456789';
  
      const getRandomFromSet = (length, charSet) => {
          let result = '';
          for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * charSet.length);
              result += charSet[randomIndex];
          }
          return result;
      };

      const localPart = getRandomFromSet(localLength, baseCharacters1 + specialCharacters1);
      const domainPart = getRandomFromSet(domainLength, baseCharacters1); 
      const tld = getRandomFromSet(tldLength, baseCharacters1); 
      return `${localPart}@${domainPart}.${tld}`;
    }
    const inputEmailField = await this.inputEmailAddress;

    await inputEmailField.clearValue(); 
    function isValidEmailFormat(inputEmailField) {
      const emailRegex = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
      return emailRegex.test(inputEmailField);
    }
    for (let i = 0; i <= 10; i++) {

      const valueToEnterEmail = getRandomEmail(0 + i, 0 + i, 0 + Math.floor(i / 2));
      console.log(`Iteration ${i}: ${valueToEnterEmail}`);
      const emailCheck = isValidEmailFormat(valueToEnterEmail);
      
      await inputEmailField.setValue(valueToEnterEmail);

      const errorMessage = await this.errormsg;
      await errorMessage.waitForDisplayed({ timeout: 5000 });
      const displayedMessage1 = await errorMessage.getText();

      if (emailCheck) {
          expect(displayedMessage1).toBe('You must fill out your name!');
          console.log(`Iteration ${i}: '${valueToEnterEmail}' is valid. Message: '${displayedMessage1}'`);
      } else {
          expect(displayedMessage1).toBe('Please enter a valid name and email.');
          console.log(`Iteration ${i}: '${valueToEnterEmail}' is invalid. Message: '${displayedMessage1}'`);
      }
    }
  
  }
  async palPalValidation() {
     
    async function handleButtonClick(button, urlSubstring) {
      await expect(button).toBeExisting();

      const originalWindow = await browser.getWindowHandle();

      await button.click();

      await browser.waitUntil(
          async () => (await browser.getWindowHandles()).length > 1,
          {
              timeout: 5000,
              timeoutMsg: 'New window did not open within 5 seconds',
          }
      );

      const allWindows = await browser.getWindowHandles();
      for (const handle of allWindows) {
          if (handle !== originalWindow) {
              await browser.switchToWindow(handle);
              break;
          }
      }

      await browser.waitUntil(
          async () => (await browser.getUrl()).includes(urlSubstring),
          {
              timeout: 10000,
              timeoutMsg: `URL did not contain the expected text: ${urlSubstring}`,
          }
      );

      await browser.closeWindow();

      await browser.switchToWindow(originalWindow);

    }
    await browser.switchFrame(this.iframe);
    await browser.switchFrame(this.iframePP);
    await handleButtonClick(this.payPalBtn,  'paypal'); 
    await browser.switchFrame(this.iframe);
    await browser.switchFrame(this.iframePP);
    await handleButtonClick(this.payLaterBtn,  'paypal'); 
  }


  async giftTest () {
    await this.CustomTreeMain();
    
    await browser.waitUntil(
        async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/',
        {
          timeout: 15000, 
          timeoutMsg: 'URL did not match the expected value within 5 seconds',
        }
    );

    await this.giftCertificateLink.click();
    await browser.waitUntil(
      async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/gift-certificates',
      {
        timeout: 5000, 
        timeoutMsg: 'URL did not match the expected value within 5 seconds',
      }
    );
    await MainLinks.howItWorks.waitForExist({timeout: 5000});
    await MainLinks.howItWorks.moveTo();
    await this.iframe.waitForExist({ timeout: 5000 });
    await this.iframe.waitForDisplayed({ timeout: 5000 });
    await this.iframe.moveTo();
    await browser.switchFrame(this.iframe);
    await browser.switchToParentFrame();
    await browser.switchFrame(this.iframe);

    await this.inputEmailAddress.waitForExist({timeout: 5000});
    await this.inputEmailAddress.waitForDisplayed({timeout: 5000});

    await this.iframePP.waitForExist({ timeout: 5000 });
    await this.iframePP.waitForDisplayed({ timeout: 5000 });
    await browser.switchFrame(this.iframePP);
    await expect(this.payPalBtn).toBeExisting();
    await this.payPalBtn.click();

    await browser.switchToParentFrame();
    await browser.switchToParentFrame();
    await browser.switchFrame(this.iframe)

    await expect(this.errormsg).toBeExisting();
    await this.selectOptions();

    await this.nameValidation();
    await this.emailValidation();
  
    await this.inputUserName.setValue('Travis')
    await this.inputEmailAddress.setValue('test@test.com');

    await browser.switchToParentFrame();
    
    await this.palPalValidation();

    await browser.switchToParentFrame();
    await browser.switchToParentFrame();
  };
};


export default new GiftCertificates ();
