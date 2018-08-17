function GoalsShowCtrl($scope, $http, $state) {
  $scope.deleteGoal = function() {
    $http({
      method: 'DELETE',
      url: `/api/goals/${$state.params.id}`
    })
      .then(() => $state.go('goalsIndex'));
  // }
  //   $http({
  //     method: 'GET',
  //     url: `/api/goals`
  //   })

  };
}


export default GoalsShowCtrl;
