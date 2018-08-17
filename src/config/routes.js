function Router($stateProvider, $urlRouterProvider) {

// function secureState($q, $state, $auth, $rootScope) {
//   return new $q((resolve) => {
//     if ($auth.isAuthenticated()) return resolve();
//     console.log('Creating a flash message from the router');
//
//   })
// }

  $stateProvider
    .state('login', {
      templateUrl: './views/auth/login.html',
      url: '/login'
      // controller: 'AuthLoginCtrl' //ADD THIS IN
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
