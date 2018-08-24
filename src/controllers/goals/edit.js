function GoalsEditCtrl($scope, $http, $state, $rootScope) {
  $scope.updateGoal = function() {
    $http({
      method: 'PUT',
      url: `/api/goals/${$state.params.id}`,
      data: $scope.goal
    })
      .then(() => $rootScope.$broadcast( 'flashMessage',
        { type: 'success',
          content: 'Changes have been saved'
        }))
      .then(() =>$state.go('goalsIndex'));
  };

  $http({
    method: 'GET',
    url: `/api/goals/${$state.params.id}`
  })
    .then(res => $scope.goal = res.data);
}

export default GoalsEditCtrl;
