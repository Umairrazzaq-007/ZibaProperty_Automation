// Helper script to capture dropdown page source
const fs = require('fs');

describe('Capture Dropdown State', () => {
    it('should capture page source after opening role dropdown', async () => {
        // Wait for app to load
        await driver.pause(3000);

        // Click on the role dropdown
        const roleDropdown = await $('//android.widget.TextView[@text="Select a Role*"]');
        await roleDropdown.waitForDisplayed({ timeout: 10000 });
        await roleDropdown.click();

        // Wait for dropdown to open
        await driver.pause(2000);

        // Capture page source
        const pageSource = await driver.getPageSource();
        fs.writeFileSync('dropdown_open.xml', pageSource);
        console.log('Page source saved to dropdown_open.xml');

        // Also log all buttons
        const buttons = await $$('//android.widget.Button');
        console.log(`Found ${buttons.length} buttons`);

        for (let i = 0; i < buttons.length; i++) {
            try {
                const contentDesc = await buttons[i].getAttribute('content-desc');
                const text = await buttons[i].getText();
                const displayed = await buttons[i].isDisplayed();
                console.log(`Button ${i}: content-desc="${contentDesc}", text="${text}", displayed=${displayed}`);
            } catch (e) {
                console.log(`Button ${i}: Could not get attributes`);
            }
        }
    });
});
