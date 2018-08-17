function AuthLoginCtrl($scope, $auth, $state) {
  $scope.login = function() {
    console.log('Logging in');
    $auth.login($scope.user)
      .then(() => $state.go('dashboard'))
      .catch(err => console.log('There was an error', err));
  };
}

export default AuthLoginCtrl;
