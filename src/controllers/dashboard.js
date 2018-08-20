function DashboardCtrl($rootScope, $scope, $http) {
  console.log('user is', $rootScope.user);
  $scope.user = $rootScope.user;
  $scope.mode = 'notEdit';
  const today = new Date;
  const slicedDate = today.toLocaleString().slice(0,10);
  let expenseDate;
  let totalCost = 0;


  $scope.editBudget = function(name){
    $scope.mode = 'edit';
    console.log(name);
  //something done to change the <strong> element into a text input
  };

  $scope.saveBudget = function(name){
    $scope.mode = 'notEdit';
    console.log(name);
    $scope.user.password = $rootScope.user.password;
    $scope.user.passwordConfirmation = $rootScope.user.password;
    $http({
      method: 'PUT',
      url: `/api/users/${$rootScope.user._id}`,
      data: $scope.user
    });
  };


  // making GET request to get user expenses in dashboard scope
  const userExpenses = [];
  $http({
    method: 'GET',
    url: '/api/expenses'
  })
    .then(res => {

      res.data.forEach(expense => {
        if(expense.createdBy._id === $rootScope.user._id) {
          userExpenses.push(expense);
          expenseDate = `${expense.createdAt.slice(8,10)}/${expense.createdAt.slice(5,7)}/${expense.createdAt.slice(0,4)}`;
          // console.log('expense created at', `${expense.createdAt.slice(8,10)}/${expense.createdAt.slice(5,7)}/${expense.createdAt.slice(0,4)}`);
          if (expenseDate === slicedDate) {
            //
            //
            totalCost = totalCost + expense.cost;
          }
        }
      });

      $rootScope.displayTotal= totalCost;
      console.log('User expense is ===>', userExpenses);
      $scope.expenses = userExpenses;
    });


  //something done to change the <strong> element into a text input
}

export default DashboardCtrl;
