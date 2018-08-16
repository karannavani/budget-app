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
