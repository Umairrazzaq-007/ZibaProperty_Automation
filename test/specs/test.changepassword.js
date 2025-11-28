import { DESKTOP_BROWSERS } from 'appium/build/lib/constants.js';
import changePassword from '../pageobjects/changepassword.js';

describe('Account password change ', () => {
    it('should change password', async () => {
        await driver.pause(3000);
        
        await changePassword.tap_profile();
        await changePassword.tap_changepassword();
        await changePassword.input_oldpassword();
        await changePassword.input_newpassword();
        await changePassword.input_retypepassword();
        
        await changePassword.changepass_button.click();
        await driver.pause(2000);
        await changePassword.confirmation_button.click();
        await driver.pause(1000);
        await changePassword.logout.click();

    });
});