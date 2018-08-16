
// REQUIRE SOFTWARE HERE
const express = ('express');
const router = express.Router();
const secureRoute = require('../lib/secureRoute');
const authController = require('../controllers/authController');
const goalController = require('../controllers/goalController');
const expenseController = require('../controllers/expenseController');


//ROUTES

router.route('/expenses')
  .get(expenseController.index)
  .post(expenseController.create);

router.route('/expenses/:id')
  .get(expenseController.show)
  .put(expenseController.update)
  .delete(expenseController.delete);

router.route('/goals')
  .get(goalController.index)
  .post(secureRoute, goalController.create);

router.route('/goals/:id')
  .put(goalController.update)
  .delete(goalController.delete);

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

module.exports = router;
