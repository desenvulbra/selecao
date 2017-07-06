routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('cadastro', {
      url: '/cadastro',
      template: require('../../partials/cadastro.html'),
      controller: 'CadastroController',
      controllerAs: 'cadastro'
    });
}