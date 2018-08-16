const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function secureRoute(req, res, next) {
  // If no authorisation header, then return a 401 error
  if(!req.headers.authorization) return res.status(401).json({ message: 'No token sent' });
  // Remove 'Bearer' from the header to leave just the token
  const token = req.headers.authorization.replace('Bearer ', '');

  function handleVerify(err, result) {

    if(err) {
      return res.status(401).json({ message: 'Token invalid' });
    }

    User
      .findById(result.sub)
      .then(user => {
        if (!user) return res.status(401).json({ message: 'User not found' });
        req.user = user;
        return next();
      });
  }

  jwt.verify(token, secret, handleVerify);

}

module.exports = secureRoute;
