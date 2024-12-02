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

    async giftTest () {
        await this.open;
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://customfamilytreeart.com/',
            {
              timeout: 15000, // Timeout in milliseconds
              timeoutMsg: 'URL did not match the expected value within 5 seconds',
            }
          );
        await this.giftCertificateLink.click();
        await browser.pause(2000);

    }
}
export default new GiftCertificates ();
