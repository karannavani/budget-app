function AuthLoginCtrl($http, $rootScope, $scope, $auth, $state) {
  let user;
  $scope.login = function() {
    console.log('Logging in');
    $auth.login($scope.user);

    $http({
      method: 'GET',
      url: '/api/users'
    })
      .then(res => {
        user = res.data.find(function(user) {
          return user.email === $scope.user.email;
        });
      })
      // .find($scope.user.email)

      .then(() => {
        $rootScope.user = user;
        $scope.user = user;
        $state.go('dashboard');
      })
      .catch(err => console.log('There was an error', err));
  };



}

export default AuthLoginCtrl;
