import Base from './Base.js';
import MainLinks from './MainLinks.js';

class TreesDD extends Base {

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
    get background () {
        return $('//a[@class="no-decorations item-block internal-link"]')
    }
    async colorChange() {
        await this.treesDropDown.moveTo();
        const initialBgColor = await this.background.getCSSProperty('background-color');
        await this.ancestryTrees.moveTo();
        const hoverBgColor = await this.background.getCSSProperty('background-color');
        await expect(hoverBgColor.value).not.toBe(initialBgColor.value);
    }
    menuOptions = [
    { element: () => this.ancestryTrees, url: 'https://customfamilytreeart.com/ancestry-trees' },
    { element: () => this.descendantTrees, url: 'https://customfamilytreeart.com/descendant-trees' },
    { element: () => this.additionalDesigns, url: 'https://customfamilytreeart.com/additional-designs' },
    { element: () => this.gallery, url: 'https://customfamilytreeart.com/gallery' },
    ];
    
    async treesddtest () {
        await this.CustomTreeMain();
        await this.colorChange();

        for (const option of this.menuOptions) {
            await this.treesDropDown.moveTo();
            await option.element().moveTo();            
            await option.element().click();

  
            await browser.waitUntil(
                async () => (await browser.getUrl()) === option.url,
                {
                    timeout: 5000,
                    timeoutMsg: `URL did not match the expected value for ${option.url} within 5 seconds`,
                }
            );
  
            if (this.homePage) {
                await this.homePage.click();
            }
        }
        await this.treesDropDown.moveTo();
        await this.pagetext.moveTo();
        await this.pagetext.click()
        await expect(this.ancestryTrees).not.toBeExisting();
    }
  
    CustomTreeMain () {
        return super.CustomTreeMain();
    }
}

export default new TreesDD();
