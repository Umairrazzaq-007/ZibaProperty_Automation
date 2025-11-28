import { $ } from "@wdio/globals";

class ForgotPassword {
    get link_forgot_password() {
        return $("//android.widget.TextView[@text='Forgot Password?']");
    }
    get input_email() {
        return $("//android.widget.EditText");
    }
    get btn_send_reset() {
        return $("//android.widget.TextView[@text='Send reset email']");
    }
    get validation_error() {
        return $("//android.widget.TextView[@text='Please include ”@” in the email address']");
    }
    get popup_alert() {
        return $("//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]");
    }
    get btn_back_to_login() {
        return $("//android.view.ViewGroup[@content-desc=', Back to Login']");
    }
    get btn_cross() {
        return $("//android.view.ViewGroup[@content-desc='']");
    }

    async openForgotPassword() {
        const link = await this.link_forgot_password;
        await link.waitForDisplayed({ timeout: 5000 });
        await link.click();
    }
    async enterEmail(email) {
        const input = await this.input_email;
        await input.waitForDisplayed({ timeout: 5000 });
        await input.setValue(email);
    }
    async sendReset() {
        const btn = await this.btn_send_reset;
        await btn.waitForDisplayed({ timeout: 5000 });
        await btn.click();
    }
    async isValidationErrorVisible() {
        const err = await this.validation_error;
        return err.isDisplayed();
    }
    async waitForPopup() {
        const popup = await this.popup_alert;
        await popup.waitForDisplayed({ timeout: 7000 });
        return popup;
    }
    async backToLogin() {
        const btn = await this.btn_back_to_login;
        await btn.waitForDisplayed({ timeout: 5000 });
        await btn.click();
    }
    async closePopupWithCross() {
        const btn = await this.btn_cross;
        await btn.waitForDisplayed({ timeout: 5000 });
        await btn.click();
    }
}

export default new ForgotPassword();
