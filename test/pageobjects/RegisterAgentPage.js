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

class RegisterAgentPagege {
    // Locators using testIDs
    get roleDropdownClick() { return $('//android.view.ViewGroup[@content-desc=", Select a Role*, "]') }
    // get roleDropdown() { return $("~auth_register_agent_dropdown_role"); }
    get nameInput() { return $('//android.widget.TextView[@content-desc="Name"]') }
    get emailInput() { return $('//android.widget.Button[@content-desc="Email"]'); }
    get phoneInput() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[1]'); }
    get passwordInput() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[2]') }
    get signupBtn() { return $('//android.widget.Button[@content-desc="Unknown"]/android.widget.TextView') }


    // Function to select Agent role from dropdown
    async selectAgentRole() {
        await this.roleDropdownClick.click();
        // Try using the accessibility ID first
        const agentOption = await $('(//android.widget.Button[@content-desc="Unknown"])[2]');
        await agentOption.click();
    }


    // Fill all signup fields
    async fillForm(name, email, phone, password) {
        await this.nameInput.setValue(name);
        await this.emailInput.setValue(email);
        await this.phoneInput.setValue(phone);
        await this.passwordInput.setValue(password);
    }


    // Submit the Sign-Up form
    async submit() {
        await this.signupBtn.click();
    }
}


export default new RegisterAgentPagege();