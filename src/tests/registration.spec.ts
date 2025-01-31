import { test, expect, Page } from '@playwright/test';
import { config } from './../base/config';
import { ApplicationPage } from './../pages/ApplicationPage';
import { LoginPage } from '../pages/loginPage';
import { describe } from 'node:test';

let page: Page;
let applicationPage: ApplicationPage;
let loginPage : LoginPage
test.setTimeout(180000);

// Helper function for common setup
async function initializeTest({ browser }) {
  page = await browser.newPage();
  applicationPage = new ApplicationPage(page);
  loginPage = new LoginPage(page);
  await loginPage.loginSteps();
}

describe('Registration Flow', () => {
  
  test.beforeAll(initializeTest);
  
   test('Positive Test: submit the application', async () => {
    await applicationPage.fillAddress();
    await applicationPage.selectCountry();
    const extracurricularActivitiesPage = await applicationPage.goToNextPage();
    await extracurricularActivitiesPage.addEntry(config.activities.activity1,config.activities.yearsActivity1,config.activities.roleActivity1,config.activities.descriptionActivity1);
    await extracurricularActivitiesPage.goToNextPage();
    await extracurricularActivitiesPage.checkError("Please add at least 2 entries");
    await extracurricularActivitiesPage.addEntry(config.activities.activity2,config.activities.yearsActivity2,config.activities.roleActivity2,config.activities.descriptionActivity2);
    const highSchool = await extracurricularActivitiesPage.goToNextPage();
    highSchool.fillHighSchoolInformation();
    highSchool.uploadTranscript('My School Transcript.pdf');
    const essayPage = await highSchool.goToNextPage();
    await essayPage.checkEssayType();
    await essayPage.fillEssay();
    const reviewPage = await essayPage.goToNextPage();
    await reviewPage.review();
   
  });

  // test('Negative Test: Invalid login with incorrect credentials', async () => {
  //   await registrationPage.fillRegistrationForm('invaliduser@example.com', 'wrongPassword');
  //   await registrationPage.submitRegistration();
  //   const errorMessage = await page.locator('text=Invalid email or password');
  //   await expect(errorMessage).toBeVisible();
  // });
});

// describe('Application Form Flow', () => {

//   test.beforeAll(initializeTest);

//   test.beforeEach(async () => {
//     await page.goto(config.baseUrl + config.applicationUrl);  // Visiting application page instead
//   });

//   test('Application form: Fill out registration details and submit', async () => {
//     await applicationPage.fillApplicationForm('John', 'Doe', config.defaultAddress);
//     await applicationPage.submitApplication();
//     await expect(page).toHaveURL(`${config.baseUrl}/next-step`);
//   });
// });
