
'use strict';

// declarar modules

angular.module('ulbra', []);
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('ulbraLogin', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/index', {
            controller: 'loginController',
            hideMenus: true
        })
 
        .when('/', {
            redirectTo: '/cursos'
        })
 
        .otherwise({ redirectTo: '/index' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // manter user logado 
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirecionar para página de login se não estiver logado
            if ($location.path() !== '/index' && !$rootScope.globals.currentUser) {
                $location.path('/index');
            }
        });
    }]);