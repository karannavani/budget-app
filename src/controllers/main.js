function MainCtrl($rootScope, $scope, $auth, $state, $timeout, $http) {
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.getPayload = $auth.getPayload;

  $http({
    method: 'GET',
    url: '/api/users'
  })
    .then(users => {
      // console.log('users are', users);
      users.data.forEach(user => {
        if (user._id === $scope.getPayload().sub) {
          $scope.user = user;
          $rootScope.user = user;
        }
      });
    });

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
