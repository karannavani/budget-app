/* global describe beforeEach api it expect */

const Expense = require('../../models/expense');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
let token;

const userData = {
  username: 'louis', firstName: 'Louis', lastName: 'Glick', email: 'lg@hotmail.com', password: 'pass', passwordConfirmation: 'pass'
};

const expenseData = {
  type: 'pizza',
  cost: 15,
  repeat: false,
  merchant: 'Pizza Pilgrim',
  location: '11 Old Street',
  vital: false
};

describe('POST /expenses/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( { sub: user.id }, secret, { expiresIn: '1hr'} );
        done();
      });
  });
  xit('should return a 401 without a token', done => {
    api.post('/api/expenses')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  xit('should return a 200 with a token', done => {
    api.post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(expenseData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  xit('should return the new item data', done => {
    api.post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(expenseData)
      .end((err, res) => {
        expect(res.body.merchant).to.eq(expenseData.merchant);
        done();
      });
  });
});
