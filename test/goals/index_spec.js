/*global describe, expect, api, it, beforeEach */

const Goal = require('../../models/goal');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

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

const userData = { username: 'louis',
  firstName: 'Louis',
  lastName: 'Glick',
  email: 'lg@hotmail.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  dailyBudget: 15,
  weeklyBudget: 75,
  profilePicUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Rincewind.png' };

let token;

describe('GET /goals', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr'} );
      });
    Goal.remove({})
      .then(()=> Goal.create(goalData))
      .then(() => done());
  });

  it('returns a 200 response', done => {
    api.get('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('returns an array', done => {
    api.get('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('returns an array of the correct length', done => {
    api.get('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body.length).to.eq(goalData.length);
        done();
      });
  });

  it('returns an array of objects', done => {
    api.get('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        res.body.forEach(goal => expect(goal).to.be.an('object'));
        done();
      });
  });

  it('returns the correct data', done => {
    api.get('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        res.body.forEach((goal) => {
          const dataGoal = goalData.filter(gOAL => gOAL.name === goal.name) [0];
          expect(goal.name).to.eq(dataGoal.name);
          expect(goal.cost).to.eq(dataGoal.cost);
        });
        done();
      });
  });
});
