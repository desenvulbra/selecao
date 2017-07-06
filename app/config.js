/*var app = angular.module('app').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);*/
routing.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routing($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
}