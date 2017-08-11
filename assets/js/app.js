var app = angular.module('ulbra', [
  'ngAnimate',
  'ngMessages',
  'ui.router',
  'toastr',
  'ui.utils.masks',
  'ngMd5'
]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $httpProvider.interceptors.push('AuthInterceptor');

  $stateProvider
    .state('home', {
      url: '',
      templateUrl: '/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: '$ctrl'
    })
    .state('cursos', {
      url: '/cursos',
      templateUrl: '/views/cursos.html',
      controller: 'CursosCtrl',
      controllerAs: '$ctrl'
    })
    .state('cadastro', {
      url: '/cadastro',
      templateUrl: '/views/cadastro.html',
      controller: 'CadastroCtrl',
      controllerAs: '$ctrl'
    });
}]);