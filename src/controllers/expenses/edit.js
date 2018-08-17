function ExpensesEditCtrl($scope, $http, $rootscope) {
  $http({
    method: 'PUT',
    url: '/api/expenses/:id',
    data: $scope.expense
  })
    .then(() => $rootscope.broadcast({ message: 'Expense has been updated'}));
}

export default ExpensesEditCtrl;
