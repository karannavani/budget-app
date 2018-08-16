/* global describe  it expect api*/

const User = require('../../models/user');

const userData = {
  username: 'louis',
  firstName: 'Louis',
  lastName: 'Glick',
  email: `${Math.random()}@hotmail.com`,
  // email: 'karan@hotmail.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

describe('POST /register', () => {

  it('should return a 200 when validation criteria is met', done => {
    User.deleteMany({}, (err) => console.log(err));
    api.post('/api/register')
      .send(userData)
      .end((err, res) => {
        User.create(userData);
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a 422 when validation criteria is not met', done => {
    api.post('/api/register')
      .end((err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });

  it('should increase the number of users', done => {
    // User.remove({});
    User.find()
      .then(users => {
        console.log(users.length);
        expect(users.length).to.eq(1);
        done();
      });
  //   .then(users => {
  //
  //   })
  //     });
  });


});
