import { $ } from "@wdio/globals";

class Login 
{ 
    get login_tab(){
        return $('//android.widget.TextView[@text="Login"]');
     }
    get email_field(){
        return $('//android.widget.EditText[@text="sample@gmail.com"]');
    }
    get password_field(){
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }
    get login_button(){
        return $('//android.widget.TextView[@text="Continue to Ziba Property"]');
    }
    
    get roles_button() {
        return $('//android.widget.TextView[@text="Roles"]');
    }
   
    async tap_login_tab(){
        await this.login_tab.waitForExist({ timeout: 10000 });
        await this.login_tab.click();
    }
    async input_email()
    {
        await this.email_field.waitForExist({ timeout: 10000 });
        await this.email_field.setValue("newind@yopmail.com");
    }
    async input_password()
    {
        await this.password_field.waitForExist({ timeout: 10000 });
        await this.password_field.setValue("12345678");
    }
    
    async click_roles() {
        await this.roles_button.waitForDisplayed({ timeout: 10000 });
        await this.roles_button.click();
    }

   
      

}
export default new Login();