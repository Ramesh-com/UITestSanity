# Composio Regression Tests Automation

This peoject automates the regression test cases to perform the daily regression to check all the possible business use-case scenarios in order to check, if the has not any broken scenarios.
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
 - USER_EMAIL= <your_email_id>
 - HEADLESS= <'true / false '>  # 'true' for headless and 'false' for headed mode
 - PROD_URL= <production-url>
 - STAGING_URL= <staging-url>
 - LOCAL_URL= <local-url>

### 4. Set Up Gmail OAuth

You need to configure Gmail OAuth to handle email verification.

#### Step 1: Enable Gmail API

- Go to the [Google Cloud Console](https://console.developers.google.com/).
- Create a new project.
- Navigate to the **API & Services** > **Library**.
- Enable the **Gmail API**.

#### Step 2: Create OAuth 2.0 Credentials

- Navigate to **API & Services** > **Credentials**.
- Create OAuth 2.0 credentials and download the `credentials.json` file.
- Place the `credentials.json` file in the root directory of your project.

### 5. Running Tests
You can run the tests using the following command:

- To run in chrome browser 
    - npm run test:prod #To run the test on Production-env
    - npm run test:staging #To run tests on Staging-env
    - npm run test:local  #To run tests on local-env  

### 6. View Test Results
Test results are automatically generated in the `test-results/` folder. You can also view the HTML report using:
    - npx playwright show-report
