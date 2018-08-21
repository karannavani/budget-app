import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';
import './scss/style.scss';
import 'zingchart-angularjs';

// Custome Javascript
import './external';

// Router
import Router from './config/routes';

// Controllers
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';
import ProfileShowCtrl from './controllers/profile/show';
import ProfileEditCtrl from './controllers/profile/edit';

import ExpensesIndexCtrl from './controllers/expenses/index';
import ExpensesShowCtrl from './controllers/expenses/show';
import ExpensesEditCtrl from './controllers/expenses/edit';
import ExpensesNewCtrl from './controllers/expenses/new';

import GoalsIndexCtrl from './controllers/goals/index';
import GoalsShowCtrl from './controllers/goals/show';
import GoalsEditCtrl from './controllers/goals/edit';
import GoalsNewCtrl from './controllers/goals/new';

import DashboardCtrl from './controllers/dashboard';
import MainCtrl from './controllers/main';

import JourneyIndexCtrl from './controllers/journey/index';
import JourneyShowCtrl from './controllers/journey/show';

angular.module('Thrifty',
  [ 'ui.router', 'satellizer', 'ngMessages', 'zingchart-angularjs' ]
)


  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('ProfileShowCtrl', ProfileShowCtrl)
  .controller('ProfileEditCtrl', ProfileEditCtrl)

  .controller('ExpensesIndexCtrl', ExpensesIndexCtrl)
  .controller('ExpensesShowCtrl', ExpensesShowCtrl)
  .controller('ExpensesEditCtrl', ExpensesEditCtrl)
  .controller('ExpensesNewCtrl', ExpensesNewCtrl)

  .controller('GoalsIndexCtrl', GoalsIndexCtrl)
  .controller('GoalsShowCtrl', GoalsShowCtrl)
  .controller('GoalsEditCtrl', GoalsEditCtrl)
  .controller('GoalsNewCtrl', GoalsNewCtrl)

  .controller('DashboardCtrl', DashboardCtrl)
  .controller('MainCtrl', MainCtrl)

  .controller('JourneyIndexCtrl', JourneyIndexCtrl)
  .controller('JourneyShowCtrl', JourneyShowCtrl)


  // experimental code for adding a global function through a service
  // .factory('stringConverter', function() {
  //   $scope.expense.repeat === 'true' ?  $scope.expense.repeat = true :  $scope.expense.repeat = false;
  //   $scope.expense.vital === 'true' ?  $scope.expense.vital = true :  $scope.expense.vital = false;
  // })

  .config(Router)
  .config(function($authProvider) {
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
  });
