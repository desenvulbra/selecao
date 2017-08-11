var app = angular.module('ulbra', [
  'ngAnimate',
  'ngMessages',
  'ui.router',
  'toastr',
  'ui.utils.masks',
  'ngMd5'
])
.run(['$rootScope', 'TokenManager', '$state', 'toastr', '$transitions', function($rootScope, TokenManager, $state, toastr, $transitions) {
  $transitions.onBefore({}, function(trans) {
    var isProtected = trans.$to().self.auth;

    if (!TokenManager.isAuthenticated() && isProtected) {
      event.preventDefault();
      toastr.error('Acesso negado.', 'Ops!');
      $state.go('home');
      return false;
    }

    if (TokenManager.isAuthenticated() && !isProtected) {
      event.preventDefault();
      toastr.error('Acesso negado.', 'Ops!');
      $state.go('cursos');
      return false;
    }

    return true;
  });
}])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true),

  $httpProvider.interceptors.push('AuthInterceptor');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: '$ctrl',
      auth: false
    })
    .state('cadastro', {
      url: '/cadastro',
      templateUrl: '/views/cadastro.html',
      controller: 'CadastroCtrl',
      controllerAs: '$ctrl',
      auth: false
    })
    .state('cursos', {
      url: '/cursos',
      templateUrl: '/views/cursos.html',
      controller: 'CursosCtrl',
      controllerAs: '$ctrl',
      auth: true
    });
}]);