function GoalsIndexCtrl($scope, $http) {

  $http({
    method: 'GET',
    url: '/api/goals'
  })
    .then(res => {
      console.log('Your goal', res.data);
      $scope.goals = res.data;
    });
}

export default GoalsIndexCtrl;
