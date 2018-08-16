
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
