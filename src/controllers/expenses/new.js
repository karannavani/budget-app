function ExpensesNewCtrl($scope, $http, $rootscope) {
  $scope.createExpense = function() {
    $http({
      method: 'POST',
      url: 'api/expenses',
      data: $scope.expense
    })
      .then(() => $rootscope.broadcast({ message: 'You created a new expense'}));
  };
}

export default ExpensesNewCtrl;
