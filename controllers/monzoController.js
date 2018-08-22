const oauthDetails = {
  clientId: 'oauth2client_00009ZwDIYexsmCFEpJO09',
  client_secret: 'mnzpub.nLYRcNz2lKr9XsltNdJXbUygVSci/He9xp3REApCNyfGwPaqNoVQdJN/Z/KMRXlBxip7dSUFcQaZrjkzYWYH',
  redirectUri: 'http://localhost:4000/oauth/callback'
};

function login(req, res) {
  const { clientId, redirectUri } = oauthDetails;
  const monzoAuthUrl = 'https://auth.monzo.com';
}

module.exports = {
  login
};
