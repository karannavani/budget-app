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
    })
    .state('expensesIndex', {
      templateUrl: './views/expenses/index.html',
      url: '/expenses',
      controller: 'ExpensesIndexCtrl'
    })
    .state('expensesShow', {
      templateUrl: './views/expenses/show.html',
      url: '/expenses/:id',
      controller: 'ExpensesShowCtrl'
    })
    .state('expensesNew', {
      templateUrl: './views/expenses/new.html',
      url: '/expenses',
      controller: 'ExpensesNewCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
