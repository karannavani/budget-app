function ExpensesNewCtrl($scope, $http, $rootScope, $state) {
  $scope.convertString = function() {
    $scope.expense.repeat === 'true' ?  $scope.expense.repeat = true :  $scope.expense.repeat = false;
    $scope.expense.vital === 'true' ?  $scope.expense.vital = true :  $scope.expense.vital = false;
  };

  $scope.createExpense = function() {
    console.log($scope.expense);
    $scope.convertString();
    $http({
      method: 'POST',
      url: '/api/expenses',
      data: $scope.expense
    })
      .then(() => $rootScope.$broadcast('flashMessage',
        { type: 'success',
          content: 'You created a new expense'
        }))
      .then(() => $state.go('dashboard'));
  };
}

export default ExpensesNewCtrl;
