function AuthRegisterCtrl($scope, $auth, $state) {
  $scope.register = function() {
    $auth
      .signup($scope.user)
      .then(() => {
        return $auth.login($scope.user);
      })
      .then(() => $state.go('dashboard'));
  };
}

export default AuthRegisterCtrl;
