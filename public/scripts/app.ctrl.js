'use strict';
angular.module('app')  
    .controller('AppCtrl', ['$scope', '$window', '$document', '$location', '$rootScope', '$timeout',
    function (               $scope,   $window,   $document,   $location,   $rootScope,   $timeout) {
        // config
        $scope.app = {
            name: 'Ulbra',
            version: '1.0.0'
        } 

        $scope.goBack = function () {
            $window.history.back();
        }

    }
]).run([ 'cursosAPI', '$transitions', function run(cursosAPI, $transitions) {
    console.info('Anderson Bargas');

    $transitions.onStart({ to: 'cursos' }, function(trans) {
        var $state = trans.router.stateService;
        return cursosAPI.getLogado().then(function(res){//Quando fizer um cold reload, verifica se está logado
            var logado = res.logado;
            if(logado){ return true; }
            return $state.target('login');
        });
    });

}]);