function ExpensesEditCtrl($scope, $http, $rootScope, $state) {
  $scope.updateExpense = function() {
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
