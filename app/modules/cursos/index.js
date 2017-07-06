import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './cursosRota';

import cursosLista from './cursosComponent'
import UlbraService from '../../services/ulbraService';

export default angular.module('app.cursos', [uirouter])
.config(routing)
.component('cursosLista', cursosLista)
.service('UlbraService', UlbraService)
.name;