function ExpensesIndexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/expenses'
  })
    .then(res => {
      console.log('Expenses are:', res.data);
      $scope.expenses = res.data;
    });
}

export default ExpensesIndexCtrl;
