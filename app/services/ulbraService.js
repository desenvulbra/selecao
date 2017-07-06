export default class UlbraService {
	constructor($http) {
    	this.$http = $http
  	}

	getCursos() {
    	return this.$http.get('/cursos', { cache: true })
  	}

	getLogado() {
    	return this.$http.get('/logado', { cache: false })
  	}

}