function ExpensesNewCtrl($scope, $http, $rootScope) {

  $scope.sayHello = function() {
    console.log('Hello there, Im in the ExpensesNewCtrl');
  };

  $scope.createExpense = function() {
    console.log('CreateExpense function fired');
    console.log($scope.expense);
    $http({
      method: 'POST',
      url: '/api/expenses',
      data: $scope.expense
    })
      .then(() => $rootScope.broadcast({ message: 'You created a new expense'}));
  };
}

export default ExpensesNewCtrl;
