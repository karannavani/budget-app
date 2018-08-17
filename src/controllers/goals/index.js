function GoalsIndexCtrl($scope, $http) {

  $http({
    method: 'GET',
    url: '/api/whiskeys'
  })
    .then(res => {
      console.log('Your goal', res.data);
      $scope.goals = res.data;
    });
}

export default GoalsIndexCtrl;
