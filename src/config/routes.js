function Router($stateProvider, $urlRouterProvider) {

  function secureState($q, $auth, $state, $rootScope) {
    return new $q((resolve) => {
      if ($auth.isAuthenticated()) return resolve();
      console.log('Creating flash message from the router');
      $rootScope.$broadcast('flashMessage', {
        type: 'warning',
        content: 'Please Log In...'
      });
      $state.go('login');
    });
  }



  $stateProvider
    .state('goalsIndex', {
      templateUrl: './views/goals/index.html',
      url: '/goals',
      controller: 'GoalsIndexCtrl',
      resolve: { secureState }
    })
    .state('goalsShow', {
      templateUrl: './views/goals/show.html',
      url: '/goals/:id',
      controller: 'GoalsShowCtrl',
      resolve: { secureState }
    })
    .state('goalsNew', {
      templateUrl: './views/goals/new.html',
      url: '/goals/new',
      controller: 'GoalsNewCtrl',
      resolve: { secureState }
    })
    .state('goalsEdit', {
      templateUrl: './views/goals/edit.html',
      url: '/goals/:id/edit',
      controller: 'GoalsEditCtrl',
      resolve: { secureState }
    })
    .state('expensesHistory', {
      templateUrl: './views/expenses/history.html',
      url: '/expenses',
      controller: 'ExpensesIndexCtrl',
      resolve: { secureState }
    })
    .state('expensesShow', {
      templateUrl: './views/expenses/show.html',
      url: '/expenses/:id',
      controller: 'ExpensesShowCtrl',
      resolve: { secureState }
    })
    .state('expensesNew', {
      templateUrl: './views/expenses/new.html',
      url: '/expenses/new',
      controller: 'ExpensesNewCtrl',
      resolve: { secureState }
    })
    .state('expensesEdit', {
      templateUrl: './views/expenses/edit.html',
      url: '/expenses/:id/edit',
      controller: 'ExpensesEditCtrl',
      resolve: { secureState }
    })
    .state('dashboard', {
      templateUrl: './views/dashboard.html',
      url: '/dashboard',
      controller: 'DashboardCtrl',
      resolve: { secureState }
    })
    .state('register', {
      templateUrl: './views/auth/register.html',
      url: '/register',
      controller: 'AuthRegisterCtrl'
    })
    .state('login', {
      templateUrl: './views/auth/login.html',
      url: '/login',
      controller: 'AuthLoginCtrl'
    })
    .state('profileShow', {
      templateUrl: './views/profile/show.html',
      url: '/users/:id',
      controller: 'ProfileShowCtrl'
      ,resolve: { secureState }
    })
    .state('profileEdit', {
      templateUrl: './views/profile/edit.html',
      url: '/users/:id/edit',
      controller: 'ProfileEditCtrl',
      resolve: { secureState }
    })
    .state('journeyIndex', {
      templateUrl: './views/journey/index.html',
      url: '/journey',
      controller: 'JourneyIndexCtrl'
      ,resolve: { secureState }
    })
    .state('journeyShow', {
      templateUrl: './views/journey/show.html',
      url: '/journey/show',
      controller: 'JourneyShowCtrl'
      ,resolve: { secureState }
    });

  $urlRouterProvider.otherwise('/login');
}

export default Router;
