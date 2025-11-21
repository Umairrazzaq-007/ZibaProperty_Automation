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
});
