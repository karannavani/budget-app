/*global describe, expect, api, it, beforeEach */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token;

const userData =
{ username: 'louis', firstName: 'Louis', lastName: 'Glick', email: 'lg@hotmail.com', password: 'pass', passwordConfirmation: 'pass' };

const goalData = {
  name: 'Vespa SS 180',
  cost: 1200
};

describe('POST /goals', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        done();
      });
  });

  xit('returns a 401 without a token?', done => {
    api.post('/api/goals')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  xit('returns a 201 with a token?', done =>{
    api.post('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(goalData)
      .end((err, res) => {
        expect(res. status).to.eq(201);
        done();
      });
  });

  xit('returns an object', done =>{
    api.post('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(goalData)
      .end((err, res) => {
        expect(res. body).to.be.an('object');
        done();
      });
  });

  xit('returns the correct data?', done =>{
    api.post('/api/goals')
      .set('Authorization', `Bearer ${token}`)
      .send(goalData)
      .end((err, res) => {
        expect(res. body.name).to.eq(goalData.name);
        expect(res. body.cost).to.eq(goalData.cost);
        done();
      });
  });
});
