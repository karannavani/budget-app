function GoalsNewCtrl($scope, $http, $state, $rootScope) {
  $scope.createGoal = function() {
    console.log('Adding a new Goal', $scope.goal);
    $scope.goal.createdBy = $rootScope.user._id;
    $http({
      method: 'POST',
      url: '/api/goals',
      data: $scope.goal
    })
      .then(() => $state.go('goalsIndex'));
  };
}

export default GoalsNewCtrl;
