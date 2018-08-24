/* global describe beforeEach it api expect */
const Expense = require('../../models/expense');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { secret } = require('../../config/environment');
let token;

const expenseData = [{
  type: 'pizza',
  cost: 15,
  repeat: false,
  merchant: 'Pizza Pilgrim',
  location: '11 Old Street',
  vital: false
},{
  type: 'snack',
  cost: 1,
  repeat: false,
  merchant: 'Birdys Fruit and Wine',
  location: '9 Alie Street',
  vital: true
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

describe('GET /expenses', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr'});
        return Expense.remove({});
      })
      .then(() => Expense.create(expenseData))
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api.get('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an array', done => {
    api.get('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return an array of the correct length', done => {
    api.get('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body.length).to.eq(expenseData.length);
        done();
      });
  });
  it('should return an array of objects', done => {
    api.get('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.body.forEach(expense => expect(expense).to.be.an('object'));
        done();
      });
  });
});
