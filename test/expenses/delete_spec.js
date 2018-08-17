/* global api, expect, describe, it, beforeEach */
const Expense = require('../../models/expense');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token;
let expenseId;

const userData = {
  username: 'karan',
  firstName: 'Karan',
  lastName: 'Navani',
  // email: `${Math.random()}@hotmail.com`,
  email: 'karan@hotmail.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const expenseData = {
  type: 'pizza',
  cost: 15,
  repeat: false,
  merchant: 'Pizza Pilgrim',
  location: '11 Old Street',
  vital: false
};

describe('DELETE /expenses/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        return Expense.remove({});
      })
      .then(() => Expense.create(expenseData))
      .then(expense => {
        expenseId = expense.id;
        done();
      });
  });


  it('should return a 401 without a token', done => {
    api.delete(`/api/expenses/${expenseId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });






});
