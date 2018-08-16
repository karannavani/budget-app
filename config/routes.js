<<<<<<< HEAD
// REQUIRE SOFTWARE HERE
const express = ('express');
const router = express.Router();

// REQUIRE CONTROLLERS HERE
const expenseController = require('../controllers/expenseController');

// REQUIRE SECURE ROUTE HERE

//ROUTES

router.route('/expenses')
  .get(expenseController.index)
  .post(expenseController.create);

router.route('/expenses/:id')
  .get(expenseController.show)
  .put(expenseController.update)
  .delete(expenseController.delete);

module.exports = router;
=======

const secureRoute = require('../lib/secureRoute');
const authController = require('../controllers/authController');
const goalController = require('../controllers/goalController');


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
>>>>>>> 29f3a1a0ede2748cb5c8b837a069d0614dc0305e
