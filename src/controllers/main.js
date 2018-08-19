function MainCtrl($rootScope, $scope, $auth, $state, $timeout) {
  $scope.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('flashMessage', (e, data) => {
    console.log('e is', e,  'data is', data);
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 4000);
  });

  $scope.logout = function() {
    $auth.logout();
    $state.go('login');
  };
}

export default MainCtrl;
