import Login from "../pageobjects/login.page.js";
import assert from "assert";

describe("Ziba Mobile Login Suite", () => {
  const validEmail = "ar0@yopmail.com";
  const validPassword = "12345678";


  it("TC02 - Should show validation for short password", async () => {
    await Login.tap_login_tab();
    await Login.login(validEmail, "123");
    const err = await Login.waitForUiText("Your password must be at least 6 characters", 7000);
    assert.ok(await err.isExisting(), "Expected password length validation message");
    // clear inputs for next test
    await Login.clearInputs();
  }).timeout(30000);

  it("TC03 - Should show popup for wrong password and dismiss it", async () => {
    await Login.tap_login_tab();
    await Login.login(validEmail, "wrongPassword1");
    const popup = await Login.waitForPopup(10000);
    // wait for title and message
    await popup.title.waitForExist({ timeout: 5000 });
    await popup.message.waitForExist({ timeout: 5000 });
    assert.ok(await popup.message.isExisting(), "Expected popup message for wrong credentials");
    // Press OK using provided locator
    await Login.pressPopupOk();
    // clear inputs for next test
    await Login.clearInputs();
  }).timeout(30000);

  it("TC04 - Should show invalid email message for malformed email", async () => {
    await Login.tap_login_tab();
    await Login.login("ar0@", validPassword);
    const err = await Login.waitForUiText("Please enter a valid email address", 7000);
    assert.ok(await err.isExisting(), "Expected email format validation message");
    await Login.clearInputs();
  }).timeout(30000);

  // it("TC05 - Enter email with extra spaces before/after shows invalid email message", async () => {
  //   await Login.tap_login_tab();
  //   await Login.login("  ar0@yopmail.com  ", validPassword);
  //   const err = await Login.waitForUiText("Please enter a valid email address", 7000);
  //   assert.ok(await err.isExisting(), "Expected invalid email format message for spaces");
  // }).timeout(30000);

  // Ensure each test returns to the login screen and clears inputs
  afterEach(async () => {
    try {
      // If not on login screen, try to navigate back using provided locator
      await Login.goBackToLogin();
    } catch (e) {
      // ignore navigation errors
    }
    try {
      await Login.clearInputs();
    } catch (e) {
      // ignore
    }
  });

  // Run the positive/valid login last so all negative cases execute first
  it("TC01 - Should login with valid credentials", async () => {
    await Login.tap_login_tab();
    await Login.login(validEmail, validPassword);
    // If the app navigates to a dashboard, add an assertion here checking a dashboard element.
  }).timeout(60000);
});
