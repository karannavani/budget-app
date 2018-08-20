const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');
const Goal = require('../models/goal');
const Expense = require('../models/expense');

mongoose.connect(dbURI);
Goal.collection.drop();
User.collection.drop();
Expense.collection.drop();

const userData = [
  { username: 'louis', firstName: 'Louis', lastName: 'Glick', email: 'lg@hotmail.com', password: 'pass', passwordConfirmation: 'pass', dailyBudget: 15, weeklyBudget: 75, profilePicUrl: 'https://media.licdn.com/media-proxy/ext?w=800&h=800&hash=o6u9Tq%2FiOJm8OxArAcTdAq%2Fy5Lk%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R69hAxU0Rks6bmIpkb-50hKCoTTEHX8RHTuvoTTOCq8J4OcZuH--hlDJmgewUB2LrzwHWW_VtCjKoPteN0lipPtLJHjNVBROlE8gG9JodY6NRUropW_SPj5bCdN3eIVbj24Mq3gaFwsRy8n-g' },
  { username: 'tristan', firstName: 'Tristan', lastName: 'Hall', email: 'th@hotmail.com', password: 'pass', passwordConfirmation: 'pass', dailyBudget: 20, weeklyBudget: 100, profilePicUrl: 'https://media.licdn.com/dms/image/C4E03AQGhmKKaHugyWA/profile-displayphoto-shrink_200_200/0?e=1538006400&v=beta&t=SVPZtWmBzrIxR22frm3xxxZwtX4frtTns09EHUBU4n4' },
  { username: 'karan', firstName: 'Karan', lastName: 'Navani', email: 'kn@hotmail.com', password: 'pass', passwordConfirmation: 'pass', dailyBudget: 10, weeklyBudget: 80, profilePicUrl: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg' }
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
    expenseData[0].createdBy = users[0].id;
    expenseData[1].createdBy = users[1].id;
    expenseData[2].createdBy = users[2].id;
    goalData[0].createdBy = users[0].id;
    goalData[2].createdBy = users[1].id;
    goalData[1].createdBy = users[2].id;
    return Expense.create(expenseData);
  })
  .then( expenses => {
    console.log(`created ${expenses.length} expenses`);
    return Goal.create(goalData);
  })
  .then(goals => {
    console.log(`created ${goals.length} goals`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

// Expense
//   .create(expenseData)
//   .then(expenses => {
//     console.log(`created ${expenses.length} expenses`);
//   })
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());

// Goal
//   .create(goalData)
//   .then(goals => {
//     console.log(`created ${goals.length} goals`);
//   })
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());
