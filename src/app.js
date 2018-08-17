import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';
import './scss/style.scss';

// Router
import Router from './config/routes';

// Controllers
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';
import ProfileShowCtrl from './controllers/profile/show';
import ProfileEditCtrl from './controllers/profile/edit';

import GoalsIndexCtrl from './controllers/goals/index';
import GoalsShowCtrl from './controllers/goals/show';
import GoalsEditCtrl from './controllers/goals/edit';
import GoalsNewCtrl from './controllers/goals/new';


angular.module('Thrifty',
  [ 'ui.router', 'satellizer', 'ngMessages' ]
)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('ProfileShowCtrl', ProfileShowCtrl)
  .controller('ProfileEditCtrl', ProfileEditCtrl)
  .controller('GoalsIndexCtrl', GoalsIndexCtrl)
  .controller('GoalsShowCtrl', GoalsShowCtrl)
  .controller('GoalsEditCtrl', GoalsEditCtrl)
  .controller('GoalsNewCtrl', GoalsNewCtrl)
  .config(Router)
  .config(function($authProvider) {
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
  });
