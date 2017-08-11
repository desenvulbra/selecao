app.factory('Auth', ['$http', function($http) {
  return {
    authenticate: function(email, senha) {
      return $http.post('/auth/login', {
        email: email,
        senha: senha
      });
    },
    register: function(usuario) {
    	return $http.post('/auth/register', usuario);
    }
  };
}]);