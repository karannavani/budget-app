function MonzoLoginCtrl($http, $state, $scope) {

  $http({
    method: 'GET',
    url: '/api/monzo'
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });

}

export default MonzoLoginCtrl;
