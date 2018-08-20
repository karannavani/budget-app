function ExpensesEditCtrl($scope, $http, $rootScope, $state) {

  $scope.convertString = function() {
    $scope.expense.repeat === 'true' ?  $scope.expense.repeat = true :  $scope.expense.repeat = false;
    $scope.expense.vital === 'true' ?  $scope.expense.vital = true :  $scope.expense.vital = false;
  };

  $scope.updateExpense = function() {
    $scope.convertString();
    $http({
      method: 'PUT',
      url: `/api/expenses/${$state.params.id}`,
      data: $scope.expense
    })
      .then(() => $rootScope.$broadcast('flashMessage',
        { type: 'success',
          content: 'Update successful'
        }))
      .then(() => $state.go('expensesShow', { id: $state.params.id }));
  };
  $http({
    method: 'GET',
    url: `/api/expenses/${$state.params.id}`
  })
    .then(res => $scope.expense = res.data);
}

export default ExpensesEditCtrl;
