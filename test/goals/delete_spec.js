/* global api, expect, describe, it, beforeEach */

const Goal = require('../../models/goal');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token;
let goalId;

const userData =
{ username: 'louis', firstName: 'Louis', lastName: 'Glick', email: 'lg@hotmail.com', password: 'pass', passwordConfirmation: 'pass' };

const goalData = {
  name: 'Test Goal ',
  cost: 777
};

describe('DELETE /goal/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        return Goal.remove({});
      })
      .then(() => Goal.create(goalData))
      .then(goal => {
        goalId = goal.id;
        done();
      });
  });

  xit('Returns a 401 without a token?', done => {
    api.delete(`/api/goals/${goalId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  xit('Returns a 204 with a token?', done => {
    api.delete(`/api/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  xit('Delete the goal?', done => {
    api.delete(`/api/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(() => Goal.find())
      .then(goals => {
        expect(goals.length).to.eq(0);
        done();
      });
  });
});
