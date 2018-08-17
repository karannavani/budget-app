function GoalsEditCtrl($scope, $http, $state) {
  $scope.updateGoal = function() {
    $http({
      method: 'PUT',
      url: `/api/goals/${$state.params.id}`,
      data: $scope.goal
    })
      .then(() =>$state.go('goalsShow', { id: $state.params.id }));
  };

  $http({
    method: 'GET',
    url: `/api/goals/${$state.params.id}`
  })
    .then(res => $scope.goal = res.data);
}

export default GoalsEditCtrl;
