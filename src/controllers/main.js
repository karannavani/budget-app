function MainCtrl($rootScope, $scope, $auth, $state, $timeout) {
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.getPayload = $auth.getPayload;

  $rootScope.$on('flashMessage', (e, data) => {
    console.log('e is', e,  'data is', data);
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 3500);
  });

  $scope.logout = function() {
    $auth.logout();
    $state.go('login');
  };
}


export default MainCtrl;
