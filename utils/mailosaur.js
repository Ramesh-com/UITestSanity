import MailosaurClient from "mailosaur";

async function getSignInLink(mailosaurApiKey, mailosaurServerId, sentToEmail) {
  const mailosaurClient = new MailosaurClient(mailosaurApiKey);
  async function searchEmail() {
    const email = await mailosaurClient.messages.get(mailosaurServerId, {
      sentTo: sentToEmail,
    }, { timeout: 30000 }); 
    if (email) {
      console.log('Email received:', email.subject);
      const emailBody = email.text?.body || email.html?.body;
      if (emailBody) {
        const linkRegex = /https:\/\/.*\.?composio\.dev\/verify\?token=[\w-]+/;
        const match = emailBody.match(linkRegex);
        if (match) {
          console.log('Found sign-in link:', match[0]);
          return match[0];
        }
      }
    }
    return null;
  }
  return new Promise((resolve, reject) => {
    const maxAttempts = 10; 
    const interval = 2500; 
    let attempts = 0;
    const intervalId = setInterval(async () => {
      attempts++;
      console.log(`Attempt ${attempts}: Checking for email...`);
      try {
        const signInLink = await searchEmail();
        if (signInLink) {
          clearInterval(intervalId);
          resolve(signInLink);
        }
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

export { getSignInLink }