import Page from './page';
import { $ } from '@wdio/globals';

// class RegisterAgentPage extends Page {
//     /**
//      * define selectors using getter methods
//      */
//     get textHeader() { return $('~auth_register_agent_text_header'); }
//     get btnBack() { return $('~auth_register_agent_btn_back'); }
//     get dropdownRole() { return $('~auth_register_dropdown_role'); }
//     get optionAgent() { return $('~auth_register_agent_dropdown_role'); }
//     get textErrorRole() { return $('~auth_register_agent_text_error_role'); }
//     get inputName() { return $('~auth_register_agent_input_name'); }
//     get textErrorName() { return $('~auth_register_agent_text_error_name'); }
//     get inputEmail() { return $('~auth_register_agent_input_email'); }
//     get textErrorEmail() { return $('~auth_register_agent_text_error_email'); }
//     get inputPhone() { return $('~auth_register_agent_input_phone'); }
//     get textErrorPhone() { return $('~auth_register_agent_text_error_phone'); }
//     get inputPassword() { return $('~auth_register_agent_input_password'); }
//     get textErrorPassword() { return $('~auth_register_agent_text_error_password'); }
//     get btnCancel() { return $('~auth_register_agent_btn_cancel'); }
//     get btnSignup() { return $('~auth_register_agent_btn_signup'); }
//     get textErrorTerms() { return $('~auth_register_agent_text_error_terms'); }

//     /**
//      * a method to encapsule automation code to interact with the page
//      * e.g. to login using username and password
//      */
//     async signup(name, email, phone, password) {
//         if (name) await this.inputName.setValue(name);
//         if (email) await this.inputEmail.setValue(email);
//         if (phone) await this.inputPhone.setValue(phone);
//         if (password) await this.inputPassword.setValue(password);
//         await this.btnSignup.click();
//     }

//     /**
//      * overwrite specific options to adapt it to page object
//      */
//     open() {
//         return super.open('register-agent');
//     }
// }

// export default new RegisterAgentPage();

class RegisterAgentPage {
    // Locators using testIDs
    get roleDropdownClick() {
        return $('//android.widget.TextView[@text="Select a Role*"]');
    }
    // get roleDropdown() { return $("~auth_register_agent_dropdown_role"); }
    get nameInput() { return $('~auth_register_input_name'); }

    get emailInput() { return $('~auth_register_input_email'); }
    get passwordInput() { return $('~auth_register_btn_inputiconv2'); }

    // Phone locator needs to handle both placeholder and entered value (due to noReset: true)
    get phoneInput() { return $('//android.widget.EditText[contains(@text, "XXXX") or contains(@text, "03")]'); }
    get signupBtn() { return $('~ui_button_default_btn_onpress'); }


    // Function to select Agent role from dropdown
    async selectAgentRole() {
        // Try clicking the dropdown
        try {
            const dropdown = await this.roleDropdownClick;
            await dropdown.waitForDisplayed({ timeout: 10000 });
            await dropdown.click();
        } catch (e) {
            // Fallback to parent view group if textview not found/clickable
            const dropdownParent = await $('//android.view.ViewGroup[contains(@content-desc, "Select a Role")]');
            await dropdownParent.waitForDisplayed({ timeout: 5000 });
            await dropdownParent.click();
        }

        await driver.pause(2000); // Wait for dropdown to open

        // Try to find the Agent option by text first (more reliable)
        try {
            // Look for text 'Agent' or 'Real Estate Agent'
            const agentText = await $('//android.widget.TextView[contains(@text, "Agent") or contains(@text, "Real Estate")]');
            if (await agentText.isDisplayed()) {
                await agentText.click();
                return;
            }
        } catch (e) {
            console.log('Could not find Agent option by text');
        }

        // Fallback to the user's selector or other heuristics
        try {
            // The user mentioned: (//android.widget.Button[@content-desc="Unknown"])[2]
            // We'll try to list all options and click the 2nd one if it seems right
            const options = await $$('//android.widget.Button[@content-desc="Unknown"]');
            if (options.length >= 2) {
                await options[1].click();
            } else {
                // Try finding any element with text Agent
                const agentAny = await $('//*[contains(@text, "Agent")]');
                await agentAny.click();
            }
        } catch (e) {
            console.log('Failed to select Agent role. Capturing page source...');
            const source = await driver.getPageSource();
            console.log(source);
            throw e;
        }
    }


    // Fill all signup fields
    async fillForm(name, email, phone, password) {
        console.log('Starting to fill form...');

        await this.nameInput.waitForDisplayed({ timeout: 10000 });
        await this.nameInput.setValue(name);

        await this.emailInput.waitForDisplayed({ timeout: 5000 });
        await this.emailInput.setValue(email);

        await this.phoneInput.waitForDisplayed({ timeout: 5000 });
        await this.phoneInput.setValue(phone);

        await this.passwordInput.waitForDisplayed({ timeout: 5000 });
        await this.passwordInput.setValue(password);

        console.log('Form filled successfully');
    }


    // Submit the Sign-Up form
    async submit() {
        await this.signupBtn.click();
    }
}


export default new RegisterAgentPage();