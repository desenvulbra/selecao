routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      template: require('../../partials/login.html'),
      controller: 'LoginController',
      controllerAs: 'login'
    });
}