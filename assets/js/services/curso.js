app.factory('Curso', ['$http', function($http) {
  return {
    obterCursos: function() {
      return $http.get('/api/cursos');
    }
  };
}]);