import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './cadastroRota';
import CadastroController from './cadastroController';



export default angular.module('app.cadastro', [uirouter])
.config(routing)
.controller('CadastroController', CadastroController)
.name;