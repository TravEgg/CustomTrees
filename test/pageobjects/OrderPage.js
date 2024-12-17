import Base from './Base.js';

class OrderPage extends Base {
   
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

    get optionTitle () {
        return $('#optionTitle')
    }
    
    get ancestryTrees() {
        return $('//div[contains(text(), "Ancestry")]')
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

    async ordertest () {
        await this.CustomTreeMain();

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

        await this.designChoice.moveTo();
        await this.clickDesign();
        await expect(this.ancestorOption).toBeExisting();

        await this.descendantRootsOption.moveTo();

        const options = [
            { name: 'Descendants', element: this.descendantsOption, },
            { name: 'Ancestor', element: this.ancestorOption, },
            { name: 'Ancestor Roots', element: this.ancestorRootsOption, },
            { name: 'Descendant Roots', element: this.descendantRootsOption, }
        ];

        for (const option of options) {
            console.log(`Checking option: ${option.name}`);
    
            const initialBgColor = await option.element.getCSSProperty('background-color');
            
            await option.element.moveTo();
            const hoverBgColor = await option.element.getCSSProperty('background-color');
            await expect(hoverBgColor.value).not.toBe(initialBgColor.value);

            await option.element.click();
            const clickBgColor = await option.element.getCSSProperty('background-color');
    
            await expect(clickBgColor.value).not.toBe(hoverBgColor.value);
            console.log(`${option.name} clicked color: ${clickBgColor.value}`);
    
            await this.nextButton.click();
            await this.ordertohomePage.moveTo();

            await expect(this.optionTitle).toBeDisplayed();
            console.log(`${option.name} next page is displayed correctly.`);

            await this.backButton.click();
        }

        await this.ordertohomePage.click();

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
