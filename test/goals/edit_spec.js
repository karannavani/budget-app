/* global api, expect, describe, it, beforeEach */
const Goal = require('../../models/goal');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token; // token is global
let goalId;

const userData =
{ username: 'louis', firstName: 'Louis', lastName: 'Glick', email: 'lg@hotmail.com', password: 'pass', passwordConfirmation: 'pass' };

const goalData = {
  name: 'Test Goal ',
  cost: 777
};

const updateData = {
  name: 'Impossible Goal',
  cost: 666
};

describe('PUT /goals/:id', () => {
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
    api.put(`/api/goals/${goalId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  xit('Returns a 200 with a token?', done => {
    api.put(`/api/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  xit('Returns an object?', done => {
    api.put(`/api/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  xit('Returns the updated data?', done => {
    api.put(`/api/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body.name).to.eq(updateData.name);
        expect(res.body.cost).to.eq(updateData.cost);
        done();
      });
  });

});
