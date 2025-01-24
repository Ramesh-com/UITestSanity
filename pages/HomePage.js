const { clickButton, waitForPageLoad } = require('../utils/UIActions')
class HomePage {
    constructor(page) {
        this.page = page;
        this.appsDropdown = "//span[text()='Apps']";
        this.projectDropdown = "//span[text()='Project']/following-sibling::button";
        this.copyApiKeyButton = "//span[text()='API Key']/../following-sibling::button";
        this.connectedAccountsOption = "//a[@href='/connections']";
        this.appsOption = "//span[.='All Apps']";
        this.integrationsOption = "//a[@href='/integrations']";
        this.activeTriggers = "(//span[text()='Active triggers'])[1]";
        this.logsDropdown = "//span[text()='Logs']";
        this.actionLogsOption = "(//a[@href='/logs'])[2]";
        this.triggerLogsOption = "//a[@href='/trigger_logs']";
        this.settingsDropdown = "(//a[@href='/developers'])[1]";
        this.developerOption = "(//a[@href='/developers'])[2]";
        this.eventsAndTriggersOption = "//span[text()='Events and Triggers']";
        this.billingOption = "//a[@href='/billing']";
        this.upgradePlanButton = "//button[text()='Upgrade']";
    }

    async selectToolsDropdownMenu(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.appsDropdown);
    }

    async selectAllAppsMenu(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.appsOption);
    }

    async selectIntegrationsMenu(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.integrationsOption);
    }

    async selectConnectionsMenu(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.connectedAccountsOption);
    }

    async selectActiveTriggersMenu(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.activeTriggers);
    }

    async selectLogsDropdown(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.logsDropdown);
    }

    async selectActionLogs(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.actionLogsOption);
    }

    async selectTriggerLogs(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.triggerLogsOption);
    }

    async selctSettingsOption(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.settingsDropdown);
    }

    async selectDevelopersOption(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.developerOption);
    }

    async selectEventsAndTriggersOption(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.eventsAndTriggersOption);
    }

    async selectBillingOption(){
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.billingOption);
    }

    async selectUpgradePlanButton() {
        await waitForPageLoad(this.page);
        await clickButton(this.page, this.upgradePlanButton);
    }
}

module.exports = HomePage;