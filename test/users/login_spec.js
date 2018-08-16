/* global api, expect, describe, it, beforeEach */

const User = require('../../models/user');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../../config/environment');
//
// let token; // token is global

const user2Data = {
  username: 'rob',
  firstName: 'Rob',
  lastName: 'Levy',
  email: 'rob.levy@gmail.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const login = {
  email: 'rob.levy@gmail.com',
  password: 'pass'
};


describe('POST /login', () => {
  beforeEach(done => {
    User.deleteMany({}, (err) => console.log(err));
    api.post('/api/register')
      .send(user2Data)
      .end((err, res) => {
        User.create(user2Data);
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a 200 when login is successful', done => {
    // User.create(userData);
    User.find()
      .then(() => {
        api.post('/api/login')
          .send(login)
          .end((err, res) => {
            expect(res.status).to.eq(200);
            done();
          });
      });
  });

});
