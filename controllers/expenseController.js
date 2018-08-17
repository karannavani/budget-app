const Expense = require('../models/expense');

function expensesIndex(req, res, next) { // shows all a users expenses (from user history)
  Expense
    .find()
    .then(expenses => res.json(expenses))
    .catch(next);
}

function expensesShow(req, res, next) { // show a single expense (from user history)
  Expense
    .findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(next);
}

function expensesCreate(req, res, next) { // put a new expense in the DB
  Expense
    .create(req.body)
    .then(expense => res.status(201).json(expense))
    .catch(next);
}

function expensesUpdate(req, res, next) { // edit an expense in the DB
  Expense
    .findById(req.params.id)
    .then(expense => expense.set(req.body))
    .then(expense => expense.save())
    .then(expense => res.json(expense))
    .catch(next);
}

function expensesDelete(req, res, next) { // delete an expense in the DB
  Expense
    .findById(req.params.id)
    .then(expense => expense.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: expensesIndex,
  show: expensesShow,
  create: expensesCreate,
  update: expensesUpdate,
  delete: expensesDelete
};
