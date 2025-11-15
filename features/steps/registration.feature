Feature: User Registration
  
@REG_SUCCESS_001
  Scenario: Successful registration
    Given I open the main page
    When I click Create an Account link
    Then Registration page is opened
    When I register a new account with:
      | firstName | lastName     | email          | password    |
      | testName  | testLastName | test@test.com  | Qwerty!2345 |
   Then I should see welcome message "Welcome, testName testLastName!"
   # And My Account page is opened

@REG_FAILURE_001
   Scenario: Registration with already registered email
    Given I open the main page
    When I click Create an Account link
    Then Registration page is opened
    When I register a new account with:
      | firstName | lastName     | email          | password    |
      | testName  | testLastName | test@test.com  | Qwerty!2345 |
   Then I should see registration error "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account."

  