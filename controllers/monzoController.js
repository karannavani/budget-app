const rp = require('request-promise');
const request = require('request');

const oauthDetails = {
  clientId: 'oauth2client_00009ZwDIYexsmCFEpJO09',
  clientSecret: 'mnzpub.nLYRcNz2lKr9XsltNdJXbUygVSci/He9xp3REApCNyfGwPaqNoVQdJN/Z/KMRXlBxip7dSUFcQaZrjkzYWYH',
  redirectUri: 'http://localhost:4000/api/oauth/callback'
};

let accessToken = null;


function login(req, res) {
  const { clientId, redirectUri } = oauthDetails;
  // const monzoAuthUrl = 'https://auth.monzo.com';
  // const qs = req.query;

  res.redirect(`https://auth.monzo.com/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`);
}

function callback(req, res) {

  const { clientId, clientSecret, redirectUri } = oauthDetails;
  const { code } = req.query;
  const monzoAuthUrl = 'https://api.monzo.com/oauth2/token';

  // Initiate request to retrieve access token
  request.post({
    url: monzoAuthUrl,
    form: {
      grant_type: 'authorization_code',
      clientId,
      clientSecret,
      redirectUri,
      code
    }
  }, (err, response, body) => {
    accessToken = JSON.parse(body); // Populate accessToken variable with token response
    res.redirect('/accounts'); // Send user to their accounts
  });

}

module.exports = {
  login,
  callback
};
