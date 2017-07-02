angular.module("app").factory("cursosAPI", function ($http) {

	var _getCursos = function () {//Lista de chamados
		return $http.get("/cursos");
	};

	var _getLogado = function (n) {//Logado
		return $http.get("/logado");
	};

	return {
		getCursos: _getCursos,
		getLogado: _getLogado
	};
});