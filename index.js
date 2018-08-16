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

app.listen(port, () => console.log(`Express is running on port ${port}`));

module.exports = app;
