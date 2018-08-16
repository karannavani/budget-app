const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({message: 'Registration successful'}))
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      // If the password is incorrect – show error
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' });
      }
      // User is authenticated
      const token = jwt.sign({ sub: user.id, admin: false }, secret, { expiresIn: '1hr' });
      console.log('Created token', token);
      return res.json({ message: `Welcome back ${user.firstName}`, token });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
