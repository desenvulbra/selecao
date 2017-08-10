var app = angular.module('ulbra', [
  'ngAnimate',
  'ngMessages',
  'ui.router',
  'toastr',
  'ui.utils.masks'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '',
      templateUrl: '/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: '$ctrl'
    });
}]);