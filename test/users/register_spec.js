/* global describe  it expect api*/

let userData = {
  username: 'louis',
  firstName: 'Louis',
  lastName: 'Glick',
  email: `${Math.random()}@hotmail.com`,
  password: 'pass',
  passwordConfirmation: 'pass'
};

describe('POST /register', () => {

  it('should return a 200 when validation criteria is met', done => {
    console.log('user is', userData);
    api.post('/api/register')
      .send(userData, console.log('I am sending', userData))
      .end((err, res) => {
        console.log('sending =>', userData);
        expect(res.status).to.eq(200);
        userData = {};
        done();
      });
  });

  it('should return a 422 when validation criteria is not met', done => {
    console.log('user is', userData);
    api.post('/api/register')
      .end((err, res) => {
        console.log('sending =>', userData);
        expect(res.status).to.eq(422);
        userData = {};
        done();
      });
  });


});
