function MainCtrl($scope, $auth, $state) {
  $scope.isAuthenticated = $auth.isAuthenticated;

  $scope.logout = function() {
    $auth.logout();
    $state.go('login');
  };
}

export default MainCtrl;
