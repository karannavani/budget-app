function ExpensesShowCtrl($scope, $http, $state) {
  $scope.deleteExpense = function() {
    $http({
      method: 'DELETE',
      url: `/api/expenses/${$state.params.id}`
    })
      .then(() => $state.go('expensesHistory'));
  };
  $http({
    method: 'GET',
    url: `/api/expenses/${$state.params.id}`
  })
    .then(res => {
      $scope.expense = res.data;
    });
}

export default ExpensesShowCtrl;
