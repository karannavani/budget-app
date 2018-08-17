function GoalsNewCtrl($scope, $http, $state) {
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
