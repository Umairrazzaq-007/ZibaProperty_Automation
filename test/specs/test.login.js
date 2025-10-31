import Login from '../pageobjects/login.page.js';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await Login.tap_login_tab();
        await Login.input_email();
        await Login.input_password();
        await Login.login_button.click();
    })
})
