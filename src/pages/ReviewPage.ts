import { config } from "../base/config";
import { expect, Locator, Page } from '@playwright/test';

export class ReviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async review() {
    await this.page.getByRole('button', { name: '1.Lets get to know you! Edit' }).click();
    expect(this.page.getByTestId('overview-scroll-area').getByText(config.defaultName, { exact: true })).toBeVisible();
    // Make sure the element is visible before clicking
    expect(this.page.getByText(config.userCredentials.email)).toBeVisible();
    expect(this.page.getByRole('button', { name: '2.Extracurricular Activities Edit' })).toBeVisible();

    expect(this.page.getByRole('button', { name: '3.High School Information Edit' })).toBeVisible();
    await this.page.getByRole('button', { name: '3.High School Information Edit' }).click();


    await this.page.getByRole('button', { name: '4.Essay Edit' }).click();
    expect(this.page.getByRole('button', { name: '4.Essay Edit' })).toBeVisible();
    // Check the visibility of specific text
    await expect(this.page.getByText('Animals, School')).toBeVisible();

    expect(this.page.getByRole('tab', { name: 'Documents' })).toBeVisible();
    await this.page.getByRole('tab', { name: 'Documents' }).click();
    // Upload file and verify button visibility
    await this.page.getByRole('button', { name: 'Upload File' }).click();
    await expect(this.page.getByRole('button', { name: 'My School Transcript.pdf' })).toBeVisible();
  }

}
