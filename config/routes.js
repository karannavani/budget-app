// REQUIRE SOFTWARE HERE
const express = require('express');
const router = express.Router();
const secureRoute = require('../lib/secureRoute');
const authController = require('../controllers/authController');
const goalController = require('../controllers/goalController');
const expenseController = require('../controllers/expenseController');
const userController = require('../controllers/userController');
const foodController = require('../controllers/foodController');
const journeyController = require('../controllers/journeyController');

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
  // .all(secureRoute)
  .get(userController.show)
  .put(userController.update);

router.route('/food')
  .get(foodController.getPlace);

<<<<<<< HEAD
router.route('/food/:id')
  .get(foodController.showRestaurant);

=======
router.route('/tflOptions')
  .get(journeyController.generateTflOptions);

router.route('/bikeOptions')
  .get(journeyController.generateBikeOptions);
>>>>>>> afd1dc4b2708631358fe334ce3a3058130ec910a

module.exports = router;
