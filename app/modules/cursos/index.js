import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './cursosRota';
import CursosController from './cursosController';

export default angular.module('app.cursos', [uirouter])
.config(routing)
.controller('CursosController', CursosController)
.name;