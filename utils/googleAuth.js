const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// Utility function to check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// Load saved credentials if they exist
async function loadSavedCredentialsIfExist() {
  try {
    if (!(await fileExists(TOKEN_PATH))) {
      console.error(`Token file not found: ${TOKEN_PATH}`);
      return null;
    }

    const content = await fs.readFile(TOKEN_PATH, 'utf-8');
    const credentials = JSON.parse(content);
    
    if (!credentials) {
      console.error('Token file is empty or invalid.');
      return null;
    }

    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.error(`Failed to load credentials from token.json: ${err.message}`);
    return null;
  }
}

// Save credentials to a file
async function saveCredentials(client) {
  try {
    if (!(await fileExists(CREDENTIALS_PATH))) {
      console.error(`Credentials file not found: ${CREDENTIALS_PATH}`);
      return;
    }

    const content = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
    const keys = JSON.parse(content);

    if (!keys || !(keys.installed || keys.web)) {
      console.error('Invalid credentials file format.');
      return;
    }

    const key = keys.installed || keys.web;

    if (!key.client_id || !key.client_secret) {
      console.error('Missing client_id or client_secret in credentials.json.');
      return;
    }

    if (!client.credentials.refresh_token) {
      console.error('Missing refresh_token in client credentials.');
      return;
    }

    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });

    await fs.writeFile(TOKEN_PATH, payload, 'utf-8');
    console.log('Credentials saved successfully.');
  } catch (err) {
    console.error(`Failed to save credentials: ${err.message}`);
  }
}

// Refresh access token if needed
async function refreshAccessTokenIfNeeded(client) {
  if (client.credentials.expiry_date && client.credentials.expiry_date <= Date.now()) {
    try {
      console.log('Refreshing access token...');
      const newToken = await client.refreshAccessToken();
      client.setCredentials(newToken.credentials);
      await saveCredentials(client);
      console.log('Access token refreshed successfully.');
    } catch (err) {
      console.error('Failed to refresh access token:', err.message);
    }
  }
}

async function authorize() {
    let attempts = 3;
    while (attempts > 0) {
      try {
        let client = await loadSavedCredentialsIfExist();
        if (client) {
          console.log("Loaded saved credentials.");
          // Check if token needs refreshing before proceeding
          await refreshAccessTokenIfNeeded(client);
          return client;
        }
        console.log("No saved credentials, authenticating with keyfile.");
        client = await authenticate({ scopes: SCOPES, keyfilePath: CREDENTIALS_PATH });
        if (client.credentials) {
          await saveCredentials(client);
        }
        console.log("Successfully authenticated.");
        return client;
      } catch (error) {
        attempts--;
        console.error(`Authorization failed, ${attempts} attempts remaining: ${error.message}`);
        if (attempts === 0) throw error;  
      }
    }
}

async function getSignInLink(oAuth2Client) {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  // Function to search for emails in a specified label (inbox or spam)
  async function searchEmailInLabel(label) {
    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 1,
      labelIds: [label],
    });

    if (res.data.messages && res.data.messages.length > 0) {
      const message = res.data.messages[0];
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      let emailData;

      if (email.data.payload.parts) {
        const part = email.data.payload.parts.find(
          (part) => part.mimeType === 'text/html' || part.mimeType === 'text/plain'
        );
        emailData = Buffer.from(part.body.data, 'base64').toString('utf-8');
      } else {
        emailData = Buffer.from(email.data.payload.body.data, 'base64').toString('utf-8');
      }

      const linkRegex = /https:\/\/app\.composio\.dev\/verify\?token=[\w-]+/;
      const match = emailData.match(linkRegex);

      if (match) {
        console.log('Found sign-in link:', match[0]);
        return match[0];
      }
    }
    return null;
  }

  // Polling mechanism to wait for the email
  return new Promise((resolve, reject) => {
    const maxAttempts = 10; // Maximum number of attempts
    const interval = 2500; // Time between attempts (in milliseconds)
    let attempts = 0;

    const intervalId = setInterval(async () => {
      attempts++;

      console.log(`Attempt ${attempts}: Checking for email...`);

      try {
        // Try searching in "INBOX" first
        let signInLink = await searchEmailInLabel('INBOX');

        // If not found in INBOX, try searching in "SPAM"
        if (!signInLink) {
          signInLink = await searchEmailInLabel('SPAM');
        }

        // If the link is found, resolve the promise and clear the interval
        if (signInLink) {
          clearInterval(intervalId);
          resolve(signInLink);
        }

        // Stop polling after max attempts
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          reject(new Error('Failed to find sign-in link within the given attempts.'));
        }
      } catch (error) {
        clearInterval(intervalId);
        reject(error);
      }
    }, interval);
  });
}
module.exports = { authorize, getSignInLink };