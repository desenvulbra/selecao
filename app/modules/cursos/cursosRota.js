routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
    .state('cursos', {
        url: '/cursos',
        template: require('../../partials/cursos.html'),
        resolve: {
            listaCursos: ['UlbraService', (UlbraService) => {
                return UlbraService.getCursos()
            }]
        }
    });
}