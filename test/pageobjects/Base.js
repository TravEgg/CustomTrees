import { browser } from '@wdio/globals'
import { $ } from '@wdio/globals'
import { expect } from '@wdio/globals'


export default class Base {
    
    CustomTreeMain () {
        return browser.url('http://CustomFamilyTreeArt.com')
    }
}
