// import RegisterAgentPage from '../pageobjects/RegisterAgentPage';
// import LoginPage from '../pageobjects/login.page';
// import { $ } from '@wdio/globals';

// describe('Agent Signup', () => {
//     beforeEach(async () => {
//         // Navigate to Agent Signup Screen
//         // Try to navigate to Login tab first if we are on the landing page
//         try {
//             await LoginPage.tap_login_tab();
//         } catch (e) {
//             console.log('Login tab not found or already on login screen');
//         }

//         try {
//             await LoginPage.linkSignup.waitForDisplayed({ timeout: 5000 });
//             await LoginPage.linkSignup.click();
//         } catch (e) {
//             // Ignore if already on the register screen or link not found
//             // We'll let the next steps determine if we are in the right place
//         }

//         // Select Agent Role
//         await RegisterAgentPage.dropdownRole.waitForDisplayed();
//         await RegisterAgentPage.dropdownRole.click();

//         // Select 'Real Estate Agent' from the dropdown
//         await RegisterAgentPage.optionAgent.waitForDisplayed();
//         await RegisterAgentPage.optionAgent.click();
//     });

//     it('Scenario 1: Successful Agent Signup', async () => {
//         await RegisterAgentPage.signup('Agent Name', 'agent@example.com', '1234567890', 'Password123!');
//         // Add assertions
//         // e.g. await expect(SomeDashboardElement).toBeDisplayed();
//     });

//     it('Scenario 2: Missing Required Fields', async () => {
//         await RegisterAgentPage.btnSignup.click();
//         await expect(RegisterAgentPage.textErrorName).toBeDisplayed();
//         await expect(RegisterAgentPage.textErrorEmail).toBeDisplayed();
//         await expect(RegisterAgentPage.textErrorPhone).toBeDisplayed();
//         await expect(RegisterAgentPage.textErrorPassword).toBeDisplayed();
//     });

//     it('Scenario 3: Invalid Email Format', async () => {
//         await RegisterAgentPage.inputName.setValue('Test Agent');
//         await RegisterAgentPage.inputEmail.setValue('invalid-email');
//         await RegisterAgentPage.btnSignup.click();
//         await expect(RegisterAgentPage.textErrorEmail).toBeDisplayed();
//     });
// });

import RegisterAgentPage from '../pageobjects/RegisterAgentPage';


describe('ZIBA Property - Agent Role Sign-Up', () => {


    it('Should sign up a new Agent successfully', async () => {


        // Test Data
        const testData = {
            name: "John QA Tester",
            email: "qa.agent.test+2@gmail.com",
            phone: "03101234567",
            password: "Test@1234"
        };


        // Select Role → Agent
        await RegisterAgentPage.selectAgentRole();


        // Fill form
        await RegisterAgentPage.fillForm(
            testData.name,
            testData.email,
            testData.phone,
            testData.password
        );


        // Submit
        await RegisterAgentPage.submit();


        // Add assertion (example)
        await expect($("android=new UiSelector().textContains('Complete Registration')"))
            .toBeDisplayed();


    });
});