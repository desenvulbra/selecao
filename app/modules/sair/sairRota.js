routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
    .state('sair', {
        url: '/sair',
        template: '',
        controller: ($state) => { $state.go('login'); },
        resolve: {
            saida: ['UlbraService', '$q', '$state', (UlbraService, $q, $state) => {
                return UlbraService.getSair();
            }]
        }
    });
}