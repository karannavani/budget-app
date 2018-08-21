function MainCtrl($rootScope, $scope, $auth, $state, $timeout) {
  $scope.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('flashMessage', (e, data) => {
    console.log('e is', e,  'data is', data);
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 3500);
  });

  $scope.logout = function() {
    $auth.logout();
    $state.go('login');
  };
  $scope.getEventTarget = function($event) {
    console.log('this is the event target', $event.currentTarget);
  };
}


export default MainCtrl;
