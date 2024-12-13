import OrderPage from '../pageobjects/OrderPage.js'
import TreesDD from '../pageobjects/TreesDD.js'
import MainLinks from '../pageobjects/MainLinks.js'
import GiftCertificates from '../pageobjects/GiftCertificates.js'


describe('Order process page 1', () => {
    it('should test the start of the order pages', async () => {
        await OrderPage.ordertest();
    })
})  

describe('Trees Drop Down menu', () => {
    it('should test the options in the menu', async () => {
        await TreesDD.treesddtest();
    })
})

describe('All links under Info', () => {
    it('should open corresponding pages', async () => {
        await MainLinks.mainLinksTest();
    })
})

describe('Gift Certicate Link ', () => {
    it('should open gift certificate page', async () => {
        await GiftCertificates.giftTest();
    })
})