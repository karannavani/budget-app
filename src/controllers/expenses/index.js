function ExpensesIndexCtrl($scope, $http, expenses) {
  $http({
    method: 'GET',
    url: '/api/expenses'
  })
    .then(res => {
      console.log('expenses are', res.data);
      $scope.expenses = expenses;
    });
}

export default ExpensesIndexCtrl;
