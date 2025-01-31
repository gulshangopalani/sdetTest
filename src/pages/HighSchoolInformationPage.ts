import path from 'path';
import { Page, Locator } from 'playwright';
import { EssayPage } from './EssayPage';
import { config } from '../base/config';

export class HighSchoolInformationPage {
    page: Page;
    schoolNameTextbox: Locator;
    streetAddressTextbox: Locator;
    cityTextbox: Locator;
    stateDropdown: Locator;
    zipCodeTextbox: Locator;
    gpaTextbox: Locator;
    graduationDateButton: Locator;
    uploadFileButton: Locator;
    nextPageButton: Locator;
    uploadTriggerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.schoolNameTextbox = this.page.locator('input[name="contact.highSchoolName"]');
        this.streetAddressTextbox = this.page.locator('input[placeholder="Enter high school street address"]');
        this.cityTextbox = this.page.locator('input[name="contact.highSchoolCity"]');
        this.stateDropdown = this.page.locator('input[placeholder="Enter high school state"]');
        this.zipCodeTextbox = this.page.locator('input[placeholder="e.g. 55413"]');
        this.gpaTextbox = this.page.locator('input[name="contact.gpa"]');
        this.graduationDateButton = this.page.locator('input[placeholder="Enter a date"]');
        this.uploadFileButton = this.page.locator('//span[text()="Upload File"]');
        this.nextPageButton = this.page.locator('button', { hasText: 'Next Page' });
        this.uploadFileButton = this.page.locator('input[type="file"]');  // This will find the actual file input element on the page
        this.uploadTriggerButton = this.page.locator('span:text("Upload File")');
    }

    async fillHighSchoolInformation() {
        await this.schoolNameTextbox.fill("cms");
        await this.streetAddressTextbox.fill("India");
        await this.cityTextbox.fill("Pune");
        await this.stateDropdown.fill(config.defaultcity);
        await this.page.getByText(config.defaultcity).click();
        await this.zipCodeTextbox.fill("411014");
        await this.gpaTextbox.fill('70');
        await this.graduationDateButton.fill("10-10-2007");
    }

    async selectGraduationDate() {
        await this.page.getByRole('textbox', { name: 'Year of High School Graduation' }).click();
        const calendar = await this.page.locator('.mantine-DateInput-calendar');
        await calendar.locator('button', { hasText: "2021" }).click();
        await calendar.locator('button', { hasText: "Feb" }).click();
        await calendar.locator('button', { hasText: "4 February 2021" }).click();

    }

    async uploadTranscript(filePath: string) {
        const absoluteFilePath = path.resolve(__dirname, '..', '..', 'src', filePath);
        console.log(absoluteFilePath);
        await this.uploadTriggerButton.click();  // This step is necessary if your upload button is a custom element
        await this.uploadFileButton.setInputFiles(absoluteFilePath);
    }

    async goToNextPage(): Promise<EssayPage> {
        // Perform necessary actions to go to the next page
        await this.page.locator('button', { hasText: 'Next Page' }).click();
        return new EssayPage(this.page);
    }
}
