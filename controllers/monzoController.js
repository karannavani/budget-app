const rp = require('request-promise');
const request = require('request');

const oauthDetails = {
  clientId: 'oauth2client_00009ZwDIYexsmCFEpJO09',
  clientSecret: 'mnzpub.nLYRcNz2lKr9XsltNdJXbUygVSci/He9xp3REApCNyfGwPaqNoVQdJN/Z/KMRXlBxip7dSUFcQaZrjkzYWYH',
  redirectUri: 'http://localhost:4000/api/oauth/callback'
};

let accessToken = null;
let transactionsData = [];


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
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code
    }
  }, (err, response, body) => {
    accessToken = JSON.parse(body); // Populate access_token variable with token response
    console.log('callback access token is ===>', accessToken);
    // res.redirect('/api/transactions'); // Send user to their accounts
  });

}

// function accounts(req, res) {
//   console.log('accounts access token is ===>', accessToken);
//
//   const { token_type, access_token } = accessToken;
//   const accountsUrl = 'https://api.monzo.com/accounts';
//
//   request.get(accountsUrl, {
//     headers: {
//       Authorization: `${token_type} ${access_token}`
//     }
//   }, (req, response, body) => {
//     const { accounts } = JSON.parse(body);
//     // console.log('body is', body);
//     console.log('accounts is =======>', accounts);
//   });
//
// }

function transactions(req, res) {
  const { token_type, access_token } = accessToken;
  const transactionsUrl = `https://api.monzo.com/transactions?expand[]=merchant&account_id=acc_00009OPnV5jnOw9VsS0oKX&since=2018-08-16T23:00:00Z&limit=100`;

  request.get(transactionsUrl, {
    headers: {
      Authorization: `${token_type} ${access_token}`
    }
  }, (req, response, body) => {
    const { transactions } = JSON.parse(body);
    console.log('transactions is =======>', transactions);
    // transactionsData = transactions;
    res.json(transactions);
    //
    // for(let transaction of transactions) {
    //   const {
    //     description,
    //     amount,
    //     category
    //   } = transaction;
    //
    //   res.write(`
    //     <tr>
    //       <td>${description}</td>
    //       <td>${(amount/100).toFixed(2)}</td>
    //       <td>${category}</td>
    //     </tr>
    //   `);
    // }
  });
}

// function monzoData(req, res) {
//   res.json(transactions);
// }

// res.type('html');
// res.write('<h1>Accounts</h1><ul>');
//
// for(let account of accounts) {
//   const {id, type, description } = account;
//   res.write(`
//     <li>
//       ${description}(<i>${type}</i>) - <a href="/transactions/${id}">View transaction history</a>
//     </li>
//   `);
// }
//
// res.end('</ul>');

module.exports = {
  login,
  callback,
  // accounts,
  transactions
};
