import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './cadastroRota';
import CadastroController from './cadastroController';

import ngMask from 'ng-mask';
import toaster from 'angularjs-toaster';


export default angular.module('app.cadastro', [uirouter, 'ngMask', 'toaster'])
.config(routing)
.controller('CadastroController', CadastroController)
.name;