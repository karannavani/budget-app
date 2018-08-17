import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';
import './scss/style.scss';

// Router
import Router from './config/routes';

// Controllers
import ExpensesIndexCtrl from './controllers/expenses/index';
import ExpensesShowCtrl from './controllers/expenses/show';
import ExpensesEditCtrl from './controllers/expenses/edit';
import ExpensesNewCtrl from './controllers/expenses/new';



angular.module('Thrifty',
  [ 'ui.router', 'satellizer', 'ngMessages' ]
)
  .controller('ExpensesIndexCtrl', ExpensesIndexCtrl)
  .controller('ExpensesShowCtrl', ExpensesShowCtrl)
  .controller('ExpensesEditCtrl', ExpensesEditCtrl)
  .controller('ExpensesNewCtrl', ExpensesNewCtrl)
  .config(Router)
  .config(function($authProvider) {
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
  });
