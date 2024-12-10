import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Base {
    /**
    * Opens the base login page
    */
    CustomTreeMain () {
        return browser.url('http://CustomFamilyTreeArt.com')
    }
}
