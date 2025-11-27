import { $ } from "@wdio/globals";

/* ========== SMART LOCATOR HELPER ========== */
async function smartLocator(testIdSelector, fallbackSelector) {
    // Accept a single selector or an array of fallback selectors.
    const fallbacks = Array.isArray(fallbackSelector) ? fallbackSelector : [fallbackSelector];
    const selectors = [testIdSelector].concat(fallbacks).filter(Boolean);
    for (const sel of selectors) {
        try {
            const el = await $(sel);
            try {
                // First check existence quickly to avoid long waits for selectors that aren't present
                if (!await el.isExisting()) continue;
                // Then wait briefly for it to be displayed
                await el.waitForDisplayed({ timeout: 800 });
                return el;
            } catch (e) {
                // not displayed within short timeout - continue
            }
        } catch (e) {
            // ignore and continue
        }
    }
    // As a last resort return the last selector as an element (caller can wait as needed)
    const last = selectors[selectors.length - 1];
    return $(last);
}

class Login {

    /* ========== ELEMENTS WITH FALLBACK LOCATORS ========== */

    get header_login() {
        return smartLocator('~auth_login_text_header', '//android.widget.TextView[@text="Login"]');
    }

    get btn_back() {
        return smartLocator('~auth_login_btn_back', '//android.widget.Button[@content-desc="Back"]');
    }

    get link_signup() {
        return smartLocator('~auth_login_link_signup', '//android.widget.TextView[@text="Sign up"]');
    }

    get input_email() {
        // Try accessibility id, then UiSelector by description/text containing Email, then first EditText instance
        const fallbacks = [
            'android=new UiSelector().className("android.widget.EditText").descriptionContains("Email")',
            'android=new UiSelector().className("android.widget.EditText").textContains("Email")',
            'android=new UiSelector().className("android.widget.EditText").instance(0)'
        ];
        return smartLocator('~auth_login_input_email', fallbacks);
    }

    get input_password() {
        // Try accessibility id, then UiSelector password field, then instance(1)
        const fallbacks = [
            // Avoid using non-existent UiSelector methods. Match by description/text containing Password or instance(1)
            'android=new UiSelector().className("android.widget.EditText").descriptionContains("Password")',
            'android=new UiSelector().className("android.widget.EditText").instance(1)'
        ];
        return smartLocator('~auth_login_input_password', fallbacks);
    }

    get btn_toggle_password() {
        return smartLocator('~auth_login_btn_toggle_password', '//android.widget.Button[contains(@content-desc,"eye")]');
    }

    get link_forgot_password() {
        return smartLocator('~auth_login_link_forgot_password', '//android.widget.TextView[contains(@text,"Forgot")]');
    }

    get checkbox_keep_signed_in() {
        return smartLocator('~auth_login_checkbox_keep_signed_in', '//android.widget.CheckBox');
    }

    get btn_submit() {
        const fallbacks = [
            'android=new UiSelector().text("Continue to Ziba Property")',
            '//android.widget.TextView[contains(@text,"Continue")]',
            '//android.widget.TextView[@text="Continue to Ziba Property"]',
            '//android.widget.TextView[@text="Login"]',
            '//android.widget.Button[@text="Login"]',
            'android=new UiSelector().textContains("Login")'
        ];
        return smartLocator('~auth_login_btn_submit', fallbacks);
    }

    get link_login_via_otp() {
        return smartLocator('~auth_login_link_login_via_otp', '//android.widget.TextView[contains(@text,"OTP")]');
    }

    /* ========== ACTIONS ========== */
    async login(email, password) {
        const emailField = await this.input_email;
        await emailField.waitForDisplayed({ timeout: 10000 });
        await emailField.setValue(email);

        const passwordField = await this.input_password;
        await passwordField.waitForDisplayed({ timeout: 10000 });
        await passwordField.setValue(password);

        const submitBtn = await this.btn_submit;
        await submitBtn.waitForDisplayed({ timeout: 10000 });
        await submitBtn.click();
    }

    // compatibility: some tests call tap_login_tab()
    async tap_login_tab() {
        try {
            const el = await this.header_login;
            await el.waitForDisplayed({ timeout: 3000 });
            await el.click();
        } catch (e) {
            // header not present - assume we're already on login screen
        }
    }

    async togglePassword() {
        const btn = await this.btn_toggle_password;
        await btn.click();
    }

    async tapForgotPassword() {
        const link = await this.link_forgot_password;
        await link.click();
    }

    async tapLoginViaOTP() {
        const link = await this.link_login_via_otp;
        await link.click();
    }

    async tapKeepSignedIn() {
        const btn = await this.checkbox_keep_signed_in;
        await btn.click();
    }

    /* ========== ANDROID UISELECTOR / POPUP HELPERS ========== */
    // find element by UiSelector text
    async byUiText(text) {
        const sel = `android=new UiSelector().text("${text}")`;
        return $(sel);
    }

    // find element by resource id
    async byResourceId(resId) {
        const sel = `android=new UiSelector().resourceId("${resId}")`;
        return $(sel);
    }

    // wait for a UiSelector text element to appear
    async waitForUiText(text, timeout = 5000) {
        const el = await this.byUiText(text);
        await el.waitForExist({ timeout });
        return el;
    }

    // wait for the popup layout and return title and message elements
    async waitForPopup(timeout = 7000) {
        // Try several possible frame instances as some dialogs may use different indexes
        let frame = null;
        const frameIndexes = [0, 1, 2, 3];
        for (const idx of frameIndexes) {
            try {
                const sel = `android=new UiSelector().className("android.widget.FrameLayout").instance(${idx})`;
                const f = await $(sel);
                if (await f.isExisting()) {
                    frame = f;
                    break;
                }
            } catch (e) {
                // ignore and try next
            }
        }
        if (!frame) {
            // final attempt: wait for any FrameLayout to appear
            frame = await $("android=new UiSelector().className(\"android.widget.FrameLayout\")");
            await frame.waitForExist({ timeout });
        }
        const title = await this.byResourceId('com.millennium.homenet:id/alert_title');
        const message = await this.byResourceId('android:id/message');
        // attempt to locate common OK/button elements inside the popup
        let okBtn = null;
        try {
            okBtn = await $('android=new UiSelector().resourceId("android:id/button1")');
            if (!(await okBtn.isExisting())) okBtn = null;
        } catch (e) {
            okBtn = null;
        }
        return { frame, title, message, okBtn };
    }

    // press OK on popup (user provided locator uses message resource id)
    async pressPopupOk() {
        // Try common OK button resource id first
        try {
            const btn1 = await $('android=new UiSelector().resourceId("android:id/button1")');
            if (await btn1.isExisting() && await btn1.isDisplayed()) {
                await btn1.click();
                return true;
            }
        } catch (e) {
            // ignore
        }

        // Try to find a button/text with text 'OK'
        try {
            const okText = await this.byUiText('OK');
            if (await okText.isExisting() && await okText.isDisplayed()) {
                await okText.click();
                return true;
            }
        } catch (e) {
            // ignore
        }

        // Fallback: try to find a clickable child inside the popup frame
        try {
            // Try the same frame detection logic used by waitForPopup
            let popup = null;
            const frameIndexes = [0, 1, 2, 3];
            for (const idx of frameIndexes) {
                try {
                    const sel = `android=new UiSelector().className("android.widget.FrameLayout").instance(${idx})`;
                    const f = await $(sel);
                    if (await f.isExisting()) {
                        popup = f;
                        break;
                    }
                } catch (e) {}
            }
            if (!popup) popup = await $("android=new UiSelector().className(\"android.widget.FrameLayout\")");
            if (await popup.isExisting()) {
                // find any clickable button/textview inside
                const candidates = await popup.$$('//android.widget.Button | //android.widget.TextView');
                for (const c of candidates) {
                    try {
                        if (await c.isDisplayed() && await c.getAttribute('clickable') === 'true') {
                            await c.click();
                            return true;
                        }
                    } catch (e) {
                        // ignore and try next
                    }
                }
            }
        } catch (e) {
            // ignore
        }

        // As last resort, try clicking the message element (may dismiss some dialogs)
        try {
            const msg = await this.byResourceId('android:id/message');
            if (await msg.isExisting()) {
                await msg.click();
                return true;
            }
        } catch (e) {
            // ignore
        }

        // As an additional fallback try clicking the provided ViewGroup instance(20)
        try {
            const vg = await $('android=new UiSelector().className("android.view.ViewGroup").instance(20)');
            if (await vg.isExisting() && await vg.isDisplayed()) {
                await vg.click();
                return true;
            }
        } catch (e) {
            // ignore
        }

        return false;
    }

    // Dismiss an alert by waiting for its text and pressing OK (special-case for 'No Internet connection')
    async dismissAlertByText(text, timeout = 7000) {
        try {
            const el = await this.byUiText(text);
            await el.waitForExist({ timeout });
            // try to dismiss
            await this.pressPopupOk();
            return true;
        } catch (e) {
            return false;
        }
    }

    // clear email and password inputs (used to reset state between tests)
    async clearInputs() {
        try {
            const email = await this.input_email;
            await email.waitForDisplayed({ timeout: 1000 });
            // setValue replaces text on Android and is generally faster than clearValue()
            await email.setValue('');
        } catch (e) {
            // ignore if not present
        }

        try {
            const pwd = await this.input_password;
            await pwd.waitForDisplayed({ timeout: 1000 });
            await pwd.setValue('');
        } catch (e) {
            // ignore if not present
        }
    }

    // returns true if we appear to be on the login screen
    async isOnLogin(timeout = 2000) {
        try {
            const el = await this.header_login;
            return await el.isDisplayed();
        } catch (e) {
            try {
                const email = await this.input_email;
                return await email.isDisplayed();
            } catch (e2) {
                return false;
            }
        }
    }

    // If we're not on login screen, try to navigate back using provided back locator
    async goBackToLogin(timeout = 8000) {
        if (await this.isOnLogin()) return true;
        // Provided back navigation locator
        const backSel = 'android=new UiSelector().className("android.view.ViewGroup").instance(20)';
        try {
            const back = await $(backSel);
            await back.waitForExist({ timeout: 3000 });
            await back.click();
        } catch (e) {
            // if back button isn't present, try Android device back
            try {
                await driver.back();
            } catch (_e) {
                // ignore
            }
        }
        // wait for login screen to appear
        const start = Date.now();
        while (Date.now() - start < timeout) {
            if (await this.isOnLogin()) return true;
            await new Promise(r => setTimeout(r, 500));
        }
        return false;
    }
}

export default new Login();
