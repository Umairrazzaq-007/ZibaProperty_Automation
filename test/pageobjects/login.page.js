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
   
    async tap_login_tab(){
        await this.login_tab.waitForExist({ timeout: 10000 });
        await this.login_tab.click();
    }
    async input_email()
    {
        await this.email_field.waitForExist({ timeout: 10000 });
        await this.email_field.setValue("ar0@yopmail.com");
    }
    async input_password()
    {
        await this.password_field.waitForExist({ timeout: 10000 });
        await this.password_field.setValue("12345678");
    }

   
      

}
export default new Login();