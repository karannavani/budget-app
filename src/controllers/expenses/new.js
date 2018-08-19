function ExpensesNewCtrl($scope, $http, $rootScope, $state) {
  $scope.createExpense = function() {
    console.log($scope.expense);
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
