function ProfileShowCtrl($http, $scope, $state, $rootScope, $window) {
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });

  // $rootScope.user.savingsArray.forEach
  $rootScope.mySavings = $rootScope.user.savingsArray.reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
  console.log('my savings is', $rootScope.mySavings);

  $scope.goToLogin = function() {
    $window.open('/api/monzo', '_blank');
  };


  $scope.fetchMonzo = function() {
    $http({
      method: 'GET',
      url: '/api/transactions',
      skipAuthorization: true
    })
      .then(res => {
        console.log('monzo res is', res.data);
        $scope.monzoTransactions = res.data;
      });
  };

}

export default ProfileShowCtrl;
