let user;
function AuthRegisterCtrl($scope, $auth, $state, $http, $rootScope) {
  $scope.register = function() {
    $auth
      .signup($scope.user)
      .then(() => {
        return $auth.login($scope.user);
      });
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
      })
      .then(() => $state.go('dashboard'));
  };
}

export default AuthRegisterCtrl;
