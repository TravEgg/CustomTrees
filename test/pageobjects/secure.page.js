import { $ } from '@wdio/globals'
import Base from './Base.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Base {
    /**
     * define selectors using getter methods
     */
    get productPage() {
        return $('.app_logo');
    }
    get errorPopup() {
        return $('h3')
    }

    open () {
        return super.open();
    }
}

export default new SecurePage();
