function ProfileShowCtrl($http, $scope, $state, $rootScope) {
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
}

export default ProfileShowCtrl;
