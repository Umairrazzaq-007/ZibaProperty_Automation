import Login from "../pageobjects/login.page.js";
import assert from "assert";

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await Login.tap_login_tab();
    await Login.input_email();
    await Login.input_password();
    await Login.login_button.click();
    await Login.verifyLoginResult(
      '//android.widget.TextView[@text="Profile"]',
      '//android.widget.TextView[@resource-id="android:id/message"]'
    );
  });
});
