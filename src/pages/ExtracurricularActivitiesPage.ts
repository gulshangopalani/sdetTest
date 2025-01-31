import { Page, Locator } from 'playwright';
import { config } from '../base/config';
import { HighSchoolInformationPage } from './HighSchoolInformationPage';

export class ExtracurricularActivitiesPage {
    page: Page;
    addEntryButton: Locator;
    activityNameTextbox: Locator;
    yearsInvolvedTextbox: Locator;
    leadershipRolesTextbox: Locator;
    involvementDescriptionTextbox: Locator;
    addButton: Locator;
    nextPageButton: Locator;
    errorText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addEntryButton = this.page.locator('button', { hasText: 'Add Entry' });
        this.activityNameTextbox = this.page.locator('input[placeholder="Short Input"]');
        this.yearsInvolvedTextbox = this.page.locator('input[placeholder="123"]');
        this.leadershipRolesTextbox = this.page.locator('//label[contains(text(), "List any leadership roles")]/following-sibling::div/textarea');
        this.involvementDescriptionTextbox = this.page.locator('//label[contains(text(), "Description of Involvement")]/following-sibling::div/textarea');
        this.addButton = this.page.locator('//section/div/div/button/span/span[contains(text(), "Add")]');
        this.nextPageButton = page.locator('button[name="next"]');
        this.errorText = this.page.locator('.mantine-InputWrapper-error');
    }

    async addEntry(activityName: string, yearsInvolved: string, leadershipRole: string, involvementDescription: string) {
        await this.addEntryButton.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('section.m_fd1ab0aa.m_54c44539', { state: 'visible' });
        await this.activityNameTextbox.fill(activityName);
        await this.yearsInvolvedTextbox.fill(yearsInvolved);
        await this.leadershipRolesTextbox.fill(leadershipRole);
        await this.involvementDescriptionTextbox.fill(involvementDescription);
        await this.addButton.click();
    }

    async checkError(expectedErrorText: string) {
        await this.errorText.waitFor({ state: 'visible', timeout: 2000 });
        const isVisible = await this.errorText.isVisible();
        if (isVisible) {
            const errorMessage = await this.errorText.textContent();
            if (errorMessage === expectedErrorText) {
                return true;
            } else {
                console.error(`Expected error message: ${expectedErrorText}, but got: ${errorMessage}`);
                return false;
            }
        }
        
        return false;
    }
    

    async goToNextPage(): Promise<HighSchoolInformationPage> {
        // Perform necessary actions to go to the next page
        await this.page.locator('button', { hasText: 'Next Page' }).click();
        return new HighSchoolInformationPage(this.page);
    }

}
