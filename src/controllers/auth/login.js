let user;

function AuthLoginCtrl($http, $rootScope, $scope, $auth, $state) {
  $scope.login = function() {
    console.log('Logging in');
    $auth.login($scope.user);

    $http({
      method: 'GET',
      url: '/api/users'
    })
      .then(res => {
        console.log('Your User', res.data);
        user = res.data.find(function(user) {
          return user.email === $scope.user.email;
        });
        $rootScope.user = user;
        // $scope.user = $rootScope.user;
      })
      // .find($scope.user.email)
      .then(console.log('user is', $rootScope.user))
      // .then(console.log('scope is', $scope.user))
      .then(() => $state.go('dashboard'))
      .catch(err => console.log('There was an error', err));
  };

  // $scope.findUser = function()
}

export default AuthLoginCtrl;
