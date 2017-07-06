routing.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

export default function routing($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
}