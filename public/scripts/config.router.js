'use strict';

angular.module('app')
    .run([ '$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$state = $state;
    }
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('cursos', {
                url: '/cursos',
                templateUrl: 'partials/cursos.html',
                //controller: 'CursosCtrl',
                resolve: {
                  listaCursos: ['cursosAPI', '$rootScope', function(cursosAPI, $rootScope){
                              return cursosAPI.getCursos().then(function(resp){
                                  $rootScope.listaCursos = resp;
                              });
                  }]
                }
            })

            .state('404', {
              url: '/404',
              templateUrl: 'partials/404.html'
            })
            .state('505', {
              url: '/505',
              templateUrl: 'partials/505.html'
            })

            .state('login', {
              url: '/login',
              params: { login: '' },
              templateUrl: 'partials/login.html'
            })
            .state('cadastro', {
              url: '/cadastro',
              templateUrl: 'partials/cadastro.html'
            });

        }
    ]);