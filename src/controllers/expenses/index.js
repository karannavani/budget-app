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
      console.log('User expense is ===>', userExpenses);
      $scope.expenses = userExpenses;
    });

}

export default ExpensesIndexCtrl;
