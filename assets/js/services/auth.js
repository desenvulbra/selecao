app.factory('Auth', ['$http', 'md5', function($http, md5) {
  return {
    authenticate: function(email, senha) {
      senha = md5.createHash(senha);
      return $http.post('/auth/login', {
        email: email,
        senha: senha
      });
    },
    register: function(usuario) {
      if (!usuario || !usuario.senha) {
        return false;
      }
      usuario = angular.copy(usuario, {});
      usuario.senha = md5.createHash(usuario.senha);
    	return $http.post('/auth/register', usuario);
    }
  };
}]);