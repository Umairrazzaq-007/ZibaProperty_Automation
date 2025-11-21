import { $ } from "@wdio/globals";

class UpdateProfile {
    // Profile button
    get profile_button() {
        return $('//android.widget.TextView[@text="\ue921"]');
    }
    
    // Second element (e.g., Edit Profile)
    get edit_profile_button() {
        return $('//android.widget.TextView[@text="\ue9f1"]');
    }
    
    // Add more profile-related selectors here as needed
    get save_button() {
        return $('//android.widget.TextView[@text="Save"]');
    }

    // Methods
    async openProfileMenu() {
        await this.profile_button.waitForDisplayed({ timeout: 10000 });
        await this.profile_button.click();
    }
    
    async clickEditProfile() {
        await this.edit_profile_button.waitForDisplayed({ timeout: 10000 });
        await this.edit_profile_button.click();
    }
    
    async saveChanges() {
        await this.save_button.waitForDisplayed({ timeout: 10000 });
        await this.save_button.click();
    }
}

export default new UpdateProfile();
