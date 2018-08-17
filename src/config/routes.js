function Router($stateProvider, $urlRouterProvider) {

  // function secureState($q, $state, $auth, $rootScope) {
  //   return new $q((resolve) => {
  //     if ($auth.isAuthenticated()) return resolve();
  //     console.log('Creating a flash message from the router');
  //     $rootScope.$broadcast('flashMessage', {
  //       type: 'warning',
  //       content: 'please log in'
  //     });
  //     $state.go('login');
  //   });
  // }

  $stateProvider

    .state('login', {
      templateUrl: './views/auth/login.html',
      url: '/login',
      controller: 'AuthLoginCtrl' //ADD THIS IN
    })
    .state('register', {
      templateUrl: './views/auth/register.html',
      url: '/register',
      controller: 'AuthRegisterCtrl'
    })
    .state('profileShow', {
      templateUrl: './views/profile/show.html',
      url: '/profile/:id',
      controller: 'ProfileShowCtrl'
    })
    .state('profileEdit', {
      templateUrl: './views/profile/edit.html',
      url: '/profile/:id/edit',
      controller: 'ProfileEditCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
