const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .then(users => res.json(users))
    .catch(next);
}
function usersShow(req, res, next) { // show a single expense (from user history)
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow
};
