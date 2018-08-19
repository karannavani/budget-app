// REQUIRE SOFTWARE HERE
const express = require('express');
const router = express.Router();
const secureRoute = require('../lib/secureRoute');
const authController = require('../controllers/authController');
const goalController = require('../controllers/goalController');
const expenseController = require('../controllers/expenseController');
const userController = require('../controllers/userController');

//ROUTES

router.route('/expenses')
  .all(secureRoute)
  .get(expenseController.index)
  .post(expenseController.create);

router.route('/expenses/:id')
  .all(secureRoute)
  .get(expenseController.show)
  .put(expenseController.update)
  .delete(expenseController.delete);

router.route('/goals')
  .all(secureRoute)
  .get(goalController.index)
  .post(goalController.create);

router.route('/goals/:id')
  .all(secureRoute)
  .get(goalController.show)
  .put(goalController.update)
  .delete(goalController.delete);

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

router.route('/users')
  .get(userController.index);

router.route('/users/:id')
  .all(secureRoute)
  .get(userController.show)
  .put(userController.update);

module.exports = router;
