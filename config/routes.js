
const goalController = require('../controllers/goalController');


router.route('/goals')
  .get(goalController.index)
  .post(secureRoute, goalController.create);

router.route('/goals/:id')
  .put(goalController.update)
  .delete(goalController.delete);
