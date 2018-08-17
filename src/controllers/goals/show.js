function GoalsShowCtrl($scope, $http, $state) {
  $scope.deleteGoal = function() {
    $http({
      method: 'DELETE',
      url: `/api/goals/${$state.params.id}`
    })
      .then(() => $state.go('goalsIndex'));
  };
  
  $http({
    method: 'GET',
    url: `/api/goals/${$state.params.id}`
  })
    .then(res => {
      console.log('Your Goal', res.data);
      $scope.goal = res.data;
    });
}




export default GoalsShowCtrl;
