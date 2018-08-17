function ExpensesShowCtrl($scope, $http, $state) {
  $http({
    method: 'GET',
    url: `/api/expenses/${$state.params.id}`
  })
    .then(res => {
      console.log('You selected an expense', res.data);
      $scope.expense = res.data;
    });
}

export default ExpensesShowCtrl;
