routing.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

export default function routing($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/login');             // rota padrão
    $locationProvider.html5Mode(true);                  // remove a necessidade da #
}