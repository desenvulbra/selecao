import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './sairRota';



export default angular.module('app.sair', [uirouter])
.config(routing)
.name;