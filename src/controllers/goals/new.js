function GoalsNewCtrl($scope, $http, $state, $rootScope) {
  $scope.goal.createdBy = $rootScope.user._id;
  $scope.createGoal = function() {
    console.log('Adding a new Goal', $scope.goal);
    $http({
      method: 'POST',
      url: '/api/goals',
      data: $scope.goal
    })
      .then(() => $state.go('goalsIndex'));
  };
}

export default GoalsNewCtrl;
