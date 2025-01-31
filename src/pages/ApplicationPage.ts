import { Page, Locator } from '@playwright/test';
import { config } from '../base/config';
import { ExtracurricularActivitiesPage } from './ExtracurricularActivitiesPage';

export class ApplicationPage {
  private page: Page;

  // Locators for form elements
  streetAddress: Locator;
  additionalStreetAddress: Locator;
  city: Locator;
  zipCode: Locator;
  countryDropdown: Locator;
  nextPageButton: Locator;
  state :Locator;

  constructor(page: Page) {
    this.page = page;
    this.streetAddress = page.locator('input[placeholder="Enter your street address"]');
    this.additionalStreetAddress = page.locator('input[placeholder="Enter your additional street address"]');
    this.city = page.locator('input[placeholder="Enter your city"]');
    this.state =page.locator('input[placeholder="Enter your state"]');
    this.zipCode = page.locator('input[placeholder="Enter your zip code"]');
    this.countryDropdown = page.locator('input[placeholder="Enter your country"]');
    this.nextPageButton = page.locator('button[name="next"]');
  }

  async fillAddress() {
    await this.streetAddress.waitFor({ state: 'visible', timeout: 1110000 });
    await this.streetAddress.fill(config.defaultAddress);
   // await this.additionalStreetAddress.fill(config.defaultAddress);
    await this.state.click();
    await this.state.fill(config.defaultcity);
    await this.page.getByText(config.defaultcity).click();
    await this.city.fill(config.defaultcity);
    await this.zipCode.fill(config.defaultzipcode);
  }
  async selectCountry() {
    await this.countryDropdown.click();
    await this.countryDropdown.fill(config.defaultcountry);
    await this.page.getByText(config.defaultcountry, { exact: true }).click();
  }

  async goToNextPage(): Promise<ExtracurricularActivitiesPage> {
    // Perform necessary actions to go to the next page
    await this.page.locator('button', { hasText: 'Next Page' }).click();
    return new ExtracurricularActivitiesPage(this.page);
  }

}
