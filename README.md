# Composio Regression Tests Automation

This project automates the regression test cases to perform the daily regression to check all the possible business use-case scenarios in order to check, if the has not any broken scenarios.
## Prerequisites

1. **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
2. **NPM**: Node.js installation comes with NPM, which is required to install project dependencies.

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/ramesh-com/uitestsanity.git
   - cd uitestsanity

### 2. Install Dependencies
   - npm install

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following content:
 - USER_EMAIL= <your_mailosaur_email_id>
 - MAILOSAUR_API_KEY= <your-mailosaur-api-key>
 - MAILOSAUR_SERVER_ID= <your-mailosaur-server-id>
 - HEADLESS= <'true / false '>  # 'true' for headless and 'false' for headed mode
 
### 4. Running Tests
You can run the tests using the following command:

- To run in chrome browser 
    - npm run test:prod #To run the test on Production-env
    - npm run test:staging #To run tests on Staging-env
    - npm run test:local  #To run tests on local-env  

### 5. View Test Results
Test results are automatically generated in the `test-results/` folder. You can also view the HTML report using:
    - npx playwright show-report
