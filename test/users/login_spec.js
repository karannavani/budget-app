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

const loginFail = {
  email: 'rob.levy@gmail.com',
  password: 'fail'
};


describe('POST /login', () => {
  beforeEach(done => {
    User.deleteMany({}, (err) => console.log(err));
    // User.remove({})
    api.post('/api/register')
      .send(user2Data)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  // Test 1: it should log in successfully

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

  // Test 2: it should return a token

  it('should return a token', done => {
    User.find()
      .then(() => {
        api.post('/api/login')
          .send(login)
          .end((err, res) => {
            expect(res.body.token);
            done();
          });
      });
  });

  // Test 3: it should return 401 unauthorised if invalid

  it('should return a 401 when login is invalid', done => {
    // User.create(userData);
    User.find()
      .then(() => {
        api.post('/api/login')
          .send(loginFail)
          .end((err, res) => {
            expect(res.status).to.eq(401);
            done();
          });
      });
  });

});
