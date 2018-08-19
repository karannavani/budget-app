function ExpensesEditCtrl($scope, $http, $rootScope) {
  $http({
    method: 'PUT',
    url: '/api/expenses/:id',
    data: $scope.expense
  })
    .then(() => $rootScope.broadcast({ message: 'Expense has been updated'}));
}

export default ExpensesEditCtrl;
