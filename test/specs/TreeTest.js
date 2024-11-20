import { expect } from '@wdio/globals'
import OrderPage from '../pageobjects/OrderPage.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Order drop down', () => {
    it('should test the order pages', async () => {
        await OrderPage.open()
    })
})