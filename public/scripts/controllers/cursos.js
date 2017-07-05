app.controller('CursosCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
    $scope.cursos = $rootScope.listaCursos.items;
}]);