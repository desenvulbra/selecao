angular.module("app").factory("cursosAPI", function ($http) {

	var _getCursos = function () {//Lista de chamados
		//return $http.get("/cursos");
		return $http.get('/cursos', { cache: true }).then(resp => resp.data)
	};

	var _getLogado = function (n) {//Logado
		//return $http.get("/logado");
		return $http.get('/logado', { cache: false }).then(resp => resp.data)
	};

	return {
		getCursos: _getCursos,
		getLogado: _getLogado
	};
});