import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';
import './scss/style.scss';

// Router
import Router from './config/routes';

// Controllers
import AuthLoginCtrl from './controllers/auth/login';

angular.module('Thrifty',
  [ 'ui.router', 'satellizer', 'ngMessages' ]
)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .config(Router)
  .config(function($authProvider) {
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
  });
