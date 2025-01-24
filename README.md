# Composio GitHub Integration Automation

This project automates the process of connecting a GitHub account with the Composio platform using Playwright. The setup includes Gmail OAuth for handling email verification and GitHub credentials for authorizing your account.

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
2. **NPM**: Node.js installation comes with NPM, which is required to install project dependencies.

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/yourusername/composio-github-integration.git
   - cd composio-github-integration

### 2. Install Dependencies
   - npm install

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

 - USERNAME_FOR_GITHUB = <your_github_username>
 - PASSWORD_FOR_GITHUB = <your_github_password>
 - MFA_SECRET_FOR_GITHUB = <your_2fa_secret_code>
 - USER_EMAIL= <your_email_id>
 - HEADLESS= <'true / false '>  # 'true' for headless and 'false' for headed mode

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
    - npx playwright test --project chromium 

- To run test in multiple browser 
    - npx playwright test 

### 6. View Test Results
Test results are automatically generated in the `test-results/` folder. You can also view the HTML report using:
    - npx playwright show-report
