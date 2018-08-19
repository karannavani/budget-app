function ExpensesEditCtrl($scope, $http, $rootScope, $state) {
  $scope.updateExpense = function() {
    $http({
      method: 'PUT',
      url: '/api/expenses/:id',
      data: $scope.expense
    })
      .then(() => $rootScope.$broadcast('flashMessage',
        { type: 'success',
          content: 'Update successful'
        }));
  };
  $http({
    method: 'GET',
    url: `/api/expenses/${$state.params.id}`
  })
    .then(res => $scope.expense = res.data);
}

export default ExpensesEditCtrl;
