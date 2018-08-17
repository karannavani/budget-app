const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');
const Goal = require('../models/goal');
const Expense = require('../models/expense');

mongoose.connect(dbURI);
Goal.collection.drop();
User.collection.drop();

const userData = [
  { username: 'louis', firstName: 'Louis', lastName: 'Glick', email: 'lg@hotmail.com', password: 'pass', passwordConfirmation: 'pass' },
  { username: 'tristan', firstName: 'Tristan', lastName: 'Hall', email: 'th@hotmail.com', password: 'pass', passwordConfirmation: 'pass' },
  { username: 'karan', firstName: 'Karan', lastName: 'Navani', email: 'kn@hotmail.com', password: 'pass', passwordConfirmation: 'pass' }
];



const expenseData = [{
  type: 'pizza',
  cost: 15,
  repeat: false,
  merchant: 'Pizza Pilgrim',
  location: '11 Old Street',
  vital: false
}, {
  type: 'snack',
  cost: 1,
  repeat: false,
  merchant: 'Birdys Fruit and Wine',
  location: '9 Alie Street',
  vital: true
}, {
  type: 'tobacco',
  cost: 13,
  repeat: true,
  merchant: 'Tesco',
  location: 'Commercial Stret',
  vital: true
}];


const goalData = [{
  name: 'Vespa SS 180',
  cost: 1200,
  deadline: '24/03/2019',
  alreadySaved: 200,
  imageUrl: 'http://th03.deviantart.net/fs70/PRE/f/2012/140/0/1/flcl_haruko__s_vespa_super_sport_180_by_boomerjinks-d50h9gc.jpg'
}, {
  name: 'Apple Watch',
  cost: 250,
  deadline: '25/12/2018',
  alreadySaved: 7,
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBdZDW8urlFatOLD7pfYaSNFVlwoQxpDLLvnc0nS8xvoQCo2n59g',
  websiteUrl: 'https://www.apple.com/uk/shop/buy-watch/apple-watch'
}, {
  name: 'Fulgurite',
  cost: 200,
  deadline: 'N/A',
  alreadySaved: 15,
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51cNQCKiOXL._UY625_.jpg',
  websiteUrl: 'http://www.minresco.com/fulgurites/fulgurites.htm'
}];

User
  .create(userData)
  .then(users => {
    console.log(`created ${users.length} users`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

Expense
  .create(expenseData)
  .then(expenses => {
    console.log(`created ${expenses.length} expenses`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

Goal
  .create(goalData)
  .then(goals => {
    console.log(`created ${goals.length} goals`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
