import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './loginRota';
import LoginController from './loginController';

import toaster from 'angularjs-toaster';

export default angular.module('app.login', [uirouter, 'toaster'])
.config(routing)
.controller('LoginController', LoginController)
.name;