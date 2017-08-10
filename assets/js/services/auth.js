app.factory('Auth', ['$http', function($http) {
  return {
    authenticate: function(email, senha) {
      return $http.post('/auth/login', {
        email: email,
        senha: senha
      });
    },
  };
}]);