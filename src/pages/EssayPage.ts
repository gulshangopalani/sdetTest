import { Page, Locator } from 'playwright';
import { config } from '../base/config';
import { ReviewPage } from './ReviewPage';

export class EssayPage {
    page: Page;
    animalEssayType: Locator;
    schoolEssayType: Locator;
    essayTextboxSchool: Locator;
    essayTextboxAnimal: Locator;
    nextPageButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.schoolEssayType = this.page.locator('input[value="School"]');
        this.animalEssayType = this.page.locator('input[value="Animals"]');
        this.essayTextboxAnimal = this.page.locator('//label[contains(text(), "Essay about Animals")]/following-sibling::div/textarea');
        this.essayTextboxSchool = this.page.locator('//label[contains(text(), "Essay about School")]/following-sibling::div/textarea');
        this.nextPageButton = this.page.locator('button', { hasText: 'Next Page' });
    }

    async checkEssayType() {
        await this.schoolEssayType.click();
        await this.animalEssayType.click();
    }

    async fillEssay() {
        await this.essayTextboxSchool.fill(config.essayAnswers.School);
        await this.essayTextboxAnimal.fill(config.essayAnswers.Animals)
    }

    async goToNextPage(): Promise<ReviewPage> {
        await this.nextPageButton.click();
        return new ReviewPage(this.page);
      }
}
