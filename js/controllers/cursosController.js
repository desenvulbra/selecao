          angular.module("ulbra").controller("cursosController", function($scope, $http){

            var carregaJsonCursos = function(){
              $http.get("http://localhost:8080/base/curso.json").then(function (data, status) {
                $scope.lista = data;
              });
            };

            carregaJsonCursos();

          });