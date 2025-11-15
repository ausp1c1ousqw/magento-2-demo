import { headerSelectors } from "./selectors/selectors.js";
import {
  BasePage,
  Button,
  Label,
  Input,
  Checkbox,
  Link,
  pageHelpers,
} from "automation-framework/gui";

class HeaderComponent {
  get signInLink() {
    return new Link(headerSelectors.signInLink, "SignIn Link");
  }
  get welcomeMessage() {
    return new Label(headerSelectors.welcomeMessage, "Welcome message");
  }
  get createAccountLink() {
    return new Link(headerSelectors.createAccountLink, "Create Account Link");
  }

  async clickSignInLink() {
    await this.signInLink.click();
  }
  async clickCreateAccountLink() {
    await this.createAccountLink.click();
  }
  async verifyWelcomeMessage(expectedMessage) {
    const actualMessage = await this.welcomeMessage.getText();
    await pageHelpers.assertTextsWithLogging(
      actualMessage,
      expectedMessage,
      `Verify Welcome message`
    );
  }
}
export default new HeaderComponent();
