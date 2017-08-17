import angular from 'angular';                              // angular
import uirouter from 'angular-ui-router';                   // router
import routing from './config';                             // configurações do router
import start from './start';                                // verificação cold reload

import UlbraService from './services/ulbraService';         // serviço
import login from './modules/login';                        // módulo login
import cadastro from './modules/cadastro';                  // módulo cadastro
import cursos from './modules/cursos';                      // módulo cursos
import sair from './modules/sair';                          // módulo sair (apenas rota)

import 'bootstrap/dist/css/bootstrap.css';
import 'angularjs-toaster/toaster.css';
import './styles/style.css';



const modulos = [uirouter, login, cadastro, cursos, sair];  // módulos da nossa aplicação
angular.module('app', modulos)                              // injeta os módulos
.service('UlbraService', UlbraService)
.config(routing)                                            // configurações do router
.run(start);                                                // verificação cold reload