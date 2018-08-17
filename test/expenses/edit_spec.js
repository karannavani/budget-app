/* global describe beforeEach it api secret expect*/

const Expense = require('../../models/expense');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
let token;
let expenseId;

const userData = {
  username: 'tristan', firstName: 'Tristan', lastName: 'Hall', email: 'th@hotmail.com', password: 'pass', passwordConfirmation: 'pass'
};

const expenseData = {
  type: 'pizza',
  cost: 15,
  repeat: false,
  merchant: 'Pizza Pilgrim',
  location: '11 Old Street',
  vital: false
};

const updateData = {
  type: 'coffee',
  cost: 380,
  repeat: true,
  merchant: 'Black Sheep Coffee',
  location: 'Aldgate East',
  vital: false
};


describe('PUT /expenses/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( { sub: user.id }, secret, { expiresIn: '1hr' });
        return Expense.remove({});
      })
      .then(() => Expense.create(expenseData))
      .then(expense => {
        expenseId = expense.id;
        done();
      });
  });
  it('should return a 401 without a token', done => {
    api.put(`/api/expenses/${expenseId}`)
      .end((err, res)=> {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 200 with a token', done => {
    api.put(`/api/expenses/${expenseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return the updated data', done => {
    api.put(`/api/expenses/${expenseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body.type).to.eq(updateData.type);
        done();
      });
  });
});
