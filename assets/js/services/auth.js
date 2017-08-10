app.factory('Auth', ['$http', '$window', function ($http, $window) {
  return {
    authenticate: function(email, senha) {
      return $http.post('/auth/login', {
        email: email,
        senha: senha
      });
    },
    saveToken: function(token) {
      $window.localStorage['jwtToken'] = token;
    },
    getToken: function() {
      return $window.localStorage['jwtToken'];
    }
  };
}]);