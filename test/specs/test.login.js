import Login from "../pageobjects/login.page.js";

describe("My Login application", () => {
  it("should login with valid credentials and navigate to Roles", async () => {
    // Perform login
    await Login.tap_login_tab();
    await Login.input_email();
    await Login.input_password();
    await Login.login_button.click();
    
    // Navigate to Roles after successful login
    await Login.click_roles();
  });

  // Run the positive/valid login last so all negative cases execute first
  it("TC01 - Should login with valid credentials", async () => {
    await Login.tap_login_tab();
    await Login.login(validEmail, validPassword);
    // If the app navigates to a dashboard, add an assertion here checking a dashboard element.
  }).timeout(60000);
});
