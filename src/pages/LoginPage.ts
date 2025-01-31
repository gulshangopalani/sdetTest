import { expect, Locator, Page } from '@playwright/test';
import { config } from '../base/config';

export class LoginPage {
  private loginButton: Locator;
  private email: Locator;
  private password: Locator;
  private nextButton: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private phoneNumber: Locator;
  private flagOption: Locator;
  private signin: Locator;


  constructor(private page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('link', { name: 'Login' });
    this.email = this.page.getByRole('textbox', { name: 'Email Address' });
    this.password = this.page.getByRole('textbox', { name: 'Create a Password' });
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.phoneNumber = this.page.locator('.field__tel-field');
    this.nextButton = this.page.getByRole('button', { name: 'Next' });
    this.flagOption = this.page.locator('.react-tel-input.open');
    this.signin = this.page.getByRole('button', { name: 'Sign In' })
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async enterPhoneNumber() {
    await this.phoneNumber.clear();
    // await this.flagOption.waitFor({ state: 'visible', timeout: 2000 });
    // await this.page.getByRole('option', { name: 'India+' }).click();
    await this.phoneNumber.fill(config.defaultPhone);
  }

  async uncheckSmsOptIn() {
    await this.page.getByRole('checkbox', { name: 'Opt-in to program related SMS' }).uncheck();
  }

  async uncheckEmailOptIn() {
    await this.page.getByRole('checkbox', { name: 'Opt-in to email notifications' }).uncheck();
  }

  async uncheckPromoEmailOptIn() {
    await this.page.getByRole('checkbox', { name: 'Opt-in to promotional emails' }).uncheck();
  }

  async confirmAge() {
    await this.page.getByRole('checkbox', { name: 'I confirm that I am at least' }).check();
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async signIn() {
    await this.signin.click();
  }

  async loginSteps() {
    await this.page.goto(`${config.baseUrl}${config.applicationUrl}`);
    await this.clickLogin();
    await this.email.fill(config.userCredentials.email);
    await this.clickNext();
    await this.page.waitForTimeout(2000);
    // await this.firstName.waitFor({ state: 'visible', timeout: 5000  });
    const isFirstNameVisible = await this.firstName.isVisible();
    if (isFirstNameVisible) {
      console.log("First name field visible. Proceeding with login...");
      await this.firstName.fill(config.defaultName);
      await this.lastName.fill(config.defaultName);
      await this.enterPhoneNumber();
      await this.password.fill(config.userCredentials.password);
      await this.confirmAge();
      await this.submit();
    } else {
      console.log("First name field not visible. Proceeding with login...");
      await this.password.fill(config.userCredentials.password);
      await this.signIn();
    }
    await this.page.waitForTimeout(2000);
    // await expect(this.page).toHaveURL(`${config.baseUrl}${config.homeUrl}`);    
  }
}
