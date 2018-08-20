// let expense;
function ExpensesIndexCtrl($scope, $http, $rootScope) {
  $http({
    method: 'GET',
    url: '/api/expenses'
  })
    .then(res => {

      // console.log('Expenses are:', res.data);
      // $scope.expenses = res.data;
      // const expense = res.data.findAll(function(expense) {
      //   return expense.createdBy._id === $scope.user._id;
      // });
      res.data.forEach(expense => {
        console.log(expense.createdBy._id);

        if(expense.createdBy._id === $rootScope.user._id) console.log(expense);
      });
      // $scope.expenses = expense;
      console.log('Expenses are:', $scope.expenses);
    });


  // .then(res => {
  //   console.log('Your expenses', res.data);
  //   expense = res.data.find(function(expense) {
  //     return expense.createdBy.id === $scope.user.id;
  //   });
  //       $rootScope.user = user;
  //       $scope.user = $rootScope.user;
  //     })
  //     // .find($scope.user.email)
  //     .then(console.log('user is', $rootScope.user))
  //     // .then(console.log('scope is', $scope.user))
  //     .then(() => $state.go('dashboard'))
  //     .catch(err => console.log('There was an error', err));
  // };
}

export default ExpensesIndexCtrl;
