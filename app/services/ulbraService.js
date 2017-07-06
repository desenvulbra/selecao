export default class UlbraService {								// serviço
	constructor($http) {
    	this.$http = $http;										// objeto $http
  	}

	getCursos() {												// Endpoint cursos
    	return this.$http.get('/cursosJSON', { cache: true })	// retorna cursos
  	}

	getLogado() {												// Endpoint Logado?
    	return this.$http.get('/logado', { cache: false })		// retorna logado?
  	}

	getSair() {													// Endpoint sair
		return this.$http.get('/sair', { cache: false })		// retorna sucesso
	}

}