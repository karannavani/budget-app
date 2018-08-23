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
const monzoController = require('../controllers/monzoController');

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

router.route('/food/:id')
  .get(foodController.showRestaurant);

// router.route('/food/locationphoto')
//   .get(foodController.locationPhoto);
router.route('/getendpoint')
  .get(journeyController.getEndPoint);

router.route('/tflOptions')
  .get(journeyController.generateTflOptions);

router.route('/bikeOptions')
  .get(journeyController.generateBikeOptions);

router.route('/uberRouteOptions')
  .get(journeyController.findUberOptions);

router.route('/monzo')
  .get(monzoController.login);

router.route('/oauth/callback')
  .get(monzoController.callback);

// router.route('/transactions')
//   .get(monzoController.transactions);

router.route('/pots')
  .get(monzoController.pots);

router.route('/movesavings')
  .get(monzoController.moveSavings);

router.route('/balance')
  .get(monzoController.balance);
//



module.exports = router;
