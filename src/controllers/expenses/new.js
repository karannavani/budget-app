function ExpensesNewCtrl($scope, $http, $rootScope, $state, globalFunctions) {
  globalFunctions.getUserLocation();
  $scope.$watch('position', () => {
    if(globalFunctions.getUserLocation()) {
      $scope.userPosition = globalFunctions.getUserLocation();
      console.log('this is my position', $scope.userPosition);
    }
  });

  $scope.convertString = function() {
    $scope.expense.repeat === 'true' ?  $scope.expense.repeat = true :  $scope.expense.repeat = false;
    $scope.expense.vital === 'true' ?  $scope.expense.vital = true :  $scope.expense.vital = false;
  };

  $scope.createExpense = function() {
    $scope.convertString();
    $scope.expense.createdBy = $rootScope.user._id;
    $http({
      method: 'POST',
      url: '/api/expenses',
      data: $scope.expense
    })
      .then(() => $rootScope.$broadcast('flashMessage',
        { type: 'success',
          content: 'You created a new expense'
        }))
      .then(() => $state.go('dashboard'));
  };
}

export default ExpensesNewCtrl;
