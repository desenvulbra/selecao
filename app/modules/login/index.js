import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './loginRota';
import LoginController from './loginController';



export default angular.module('app.login', [uirouter])
.config(routing)
.controller('LoginController', LoginController)
.name;