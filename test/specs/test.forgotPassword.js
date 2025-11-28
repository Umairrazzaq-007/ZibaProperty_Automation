
import forgotPassword from '../pageobjects/forgotPassword.page.js';
import login from '../pageobjects/login.page.js';
import { $ } from '@wdio/globals';
import assert from 'assert';

describe('Ziba Mobile Forgot Password Suite', () => {
    beforeEach(async () => {
        // Ensure on login screen
        await login.goBackToLogin();
        await login.tap_login_tab();
        await login.clearInputs();
    });

    afterEach(async () => {
        try { await login.clearInputs(); } catch (e) {}
    });

    it('TC01 - Should show validation for invalid email', async () => {
        await forgotPassword.openForgotPassword();
        await forgotPassword.enterEmail('invalidemail');
        await forgotPassword.sendReset();
        const isVisible = await forgotPassword.isValidationErrorVisible();
        assert.ok(isVisible, 'Expected validation error for malformed email');
    }).timeout(30000);

    it('TC02 - Should show alert when no email is associated and allow OK', async () => {
        await forgotPassword.openForgotPassword();
        await forgotPassword.enterEmail('notfound@example.com');
        await forgotPassword.sendReset();

        const alertTitle = await $("android=new UiSelector().resourceId(\"com.millennium.homenet:id/alert_title\")");
        const alertMsg = await $("android=new UiSelector().resourceId(\"android:id/message\")");
        await alertTitle.waitForDisplayed({ timeout: 7000 });
        await alertMsg.waitForDisplayed({ timeout: 7000 });

        const okBtn = await $("//android.widget.Button[@resource-id='android:id/button1']");
        await okBtn.waitForDisplayed({ timeout: 5000 });
        await okBtn.click();

        // ensure alert closed and email input is available again
        await forgotPassword.openForgotPassword();
        const input = await forgotPassword.input_email;
        await input.waitForDisplayed({ timeout: 5000 });
    }).timeout(30000);

    it('TC03 - Should return to login via Back to Login button', async () => {
        await forgotPassword.openForgotPassword();
        await forgotPassword.enterEmail('valid@example.com');
        await forgotPassword.sendReset();
        await forgotPassword.waitForPopup();
        await forgotPassword.backToLogin();
        assert.ok(await login.isOnLogin(), 'Expected to be on login screen after Back to Login');
    }).timeout(30000);

    it('TC04 - Should return to login via cross button', async () => {
        await forgotPassword.openForgotPassword();
        await forgotPassword.enterEmail('valid@example.com');
        await forgotPassword.sendReset();
        await forgotPassword.waitForPopup();
        await forgotPassword.closePopupWithCross();
        assert.ok(await login.isOnLogin(), 'Expected to be on login screen after closing popup');
    }).timeout(30000);

    it('TC05 - Positive: send reset email and close popup', async () => {
        await forgotPassword.openForgotPassword();
        await forgotPassword.enterEmail('valid@example.com');
        await forgotPassword.sendReset();
        await forgotPassword.waitForPopup();
        await forgotPassword.closePopupWithCross();
        assert.ok(await login.isOnLogin(), 'Expected to land back on login after closing popup');
    }).timeout(30000);
});
