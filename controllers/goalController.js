const Goal = require('../models/goal');

function goalsIndex(req, res, next) {
  Goal
    .find()
    .then(goals => res.json(goals))
    .catch(next);
}

function goalCreate(req, res, next) {
  Goal
    .create(req.body)
    .then(goal => res.status(201).json(goal))
    .catch(next);
}

function goalUpdate(req,res, next) {
  Goal
    .findById(req.params.id)
    .then(goal => goal.set(req.body))
    .then(goal => goal.save())
    .then(goal => res.json(goal))
    .catch(next);
}

function goalShow(req, res, next) {
  Goal
    .findById(req.params.id)
    .then(goal => res.json(goal))
    .catch(next);
}

function goalDelete(req, res, next) {
  Goal
    .findById(req.params.id)
    .then(goal => goal.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}


module.exports = {
  index: goalsIndex,
  create: goalCreate,
  update: goalUpdate,
  delete: goalDelete,
  show: goalShow

};
