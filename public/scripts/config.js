// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'ngToastProvider',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide,   ngToastProvider) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
        //desativa o debug - aumentando o ganho de performance
        //$compileProvider.debugInfoEnabled(false);
    }
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }]);