const express = require('express');
const bodyParser = require('body-parser');
const router = require('./config/routes');
const errorHandler = require('./lib/errorHandler');


const app = express();

const { port, dbURI } = require('./config/environment');

//Mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));

//Middelware
app.use(bodyParser.json());

// CORS header
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', router);
app.use(errorHandler);

// app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
// const express = require('express');
const request = require('request');
// const app = express();

const oauthDetails = {
  client_id: 'oauth2client_00009ZwDIYexsmCFEpJO09',
  client_secret: 'mnzpub.nLYRcNz2lKr9XsltNdJXbUygVSci/He9xp3REApCNyfGwPaqNoVQdJN/Z/KMRXlBxip7dSUFcQaZrjkzYWYH',
  redirect_uri: 'http://localhost:4000/oauth/callback'
};

// Will be populated once received
let accessToken = null;

app.get('/', (req, res) => {
  const { client_id, redirect_uri } = oauthDetails;
  const monzoAuthUrl = 'https://auth.monzo.com';
  res.type('html');
  res.send(`
    <h1>Hello</h1>
    <form action="${monzoAuthUrl}">
      <input type="hidden" name="client_id" value="${client_id}" />
      <input type="hidden" name="redirect_uri" value="${redirect_uri}" />
      <input type="hidden" name="response_type" value="code" />
      <button>Sign in</button>
    </form>
  `);
});

app.listen(port, () => console.log(`Express is running on port ${port}`));

module.exports = app;
