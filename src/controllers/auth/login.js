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
        $rootScope.user = user;
        $scope.user = user;

      })
      // .find($scope.user.email)

      .then(() => $state.go('dashboard'))
      .catch(err => console.log('There was an error', err));
  };

  $scope.$watch(user, () => {
    if($rootScope.user) {
      console.log('user is', $rootScope.user);
      $scope.user.password = $rootScope.user.password;
      $scope.user.passwordConfirmation = $rootScope.user.password;
      $scope.user.loginArray = $rootScope.user.loginArray;
      newDay();
    }
  });


  function newDay() {
    let today = new Date;
    today = today.toLocaleString().slice(0,10);

    if ($rootScope.user.loginArray.length === 0 || $rootScope.user.loginArray[0] !== today) {
      $rootScope.user.loginArray.push(today);
      console.log('pushing to login array', $rootScope.user.loginArray);

      $http({
        method: 'PUT',
        url: `/api/users/${$rootScope.user._id}`,
        data: $rootScope.user
      });
    }
  }
}

export default AuthLoginCtrl;
