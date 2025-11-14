import { $ } from "@wdio/globals";

class ChangePassword {
    // Profile tab selector - adjust based on your app's actual UI
    get profile_tab() {
        return $('//android.widget.TextView[@text="Profile"]');
    }
    
    get changepassword_button() {
        return $('//android.widget.TextView[@text="Change Password"]');
    }
    
    get oldpassword_field() {
        return $('//android.widget.EditText[@text="Old Password *"]');
    }
    
    get newpassword_field() {
        return $('//android.widget.EditText[@text="New Password *"]');
    }
    
    get retype_field() {
        return $('//android.widget.EditText[@text="Re Type Password *"]');
    }
    
    get changepass_button() {
        return $('//android.widget.TextView[@text="Change"]');
    }

    async tap_profile() {
        await this.profile_tab.waitForDisplayed({ timeout: 10000 });
        await this.profile_tab.click();
    }
    
    async tap_changepassword() {
        await this.changepassword_button.waitForDisplayed({ timeout: 10000 });
        await this.changepassword_button.click();
    }

    async input_oldpassword() {
        await this.oldpassword_field.waitForDisplayed({ timeout: 10000 });
        await this.oldpassword_field.setValue("11111111");
    }
    
    async input_newpassword() {
        await this.newpassword_field.waitForDisplayed({ timeout: 10000 });
        await this.newpassword_field.setValue("12345678");
    }
    
    async input_retypepassword() {
        await this.retype_field.waitForDisplayed({ timeout: 10000 });
        await this.retype_field.setValue("12345678");
    }
}

export default new ChangePassword();