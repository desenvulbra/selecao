routes.$inject = ['$stateProvider'];

export default function routes($stateProvider, UlbraService) {
    $stateProvider
    .state('cursos', {
        url: '/cursos',
        template: require('../../partials/cursos.html'),
        controller: 'CursosController',
        controllerAs: 'cursos',
        resolve: {
            listaCursos: ['UlbraService', (UlbraService) => {
                return UlbraService.getCursos()
            }]
        }
    });
}