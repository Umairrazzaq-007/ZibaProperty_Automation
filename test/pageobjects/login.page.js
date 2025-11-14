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
    get validation()
    {
        return $('//android.widget.TextView[@resource-id="android:id/message"]');
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
        await this.password_field.setValue("11111111");
    }

    async verifyLoginResult(successXpath, failureXpath) {
        try {
          // Wait for one of the elements to appear
          await browser.pause(2000);
      
          // Check if success element is visible
          const successElement = await $(successXpath);
          if (await successElement.isDisplayed()) {
            const successText = await successElement.getText();
            console.log(`✅ Login Successful: ${successText}`);
            return true;
          }
      
          // Otherwise, check for failure element
          const failureElement = await $(failureXpath);
          if (await failureElement.isDisplayed()) {
            const errorText = await failureElement.getText();
            console.log(`❌ Login Failed: ${errorText}`);
            return false;
          }
      
          console.log("⚠️ No status element found — login result unknown.");
          return false;
      
        } catch (err) {
          console.error("❌ Error verifying login result:", err.message);
          return false;
        }
      }
      

}
export default new Login();