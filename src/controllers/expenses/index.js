function ExpensesIndexCtrl($scope, $http, $rootScope) {
  const userExpenses = [];
  $http({
    method: 'GET',
    url: '/api/expenses'
  })
    .then(res => {

      res.data.forEach(expense => {
        if(expense.createdBy._id === $rootScope.user._id) userExpenses.push(expense);
      });
      $scope.expenses = userExpenses;
    });

}

export default ExpensesIndexCtrl;
