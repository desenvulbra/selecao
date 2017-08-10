app.factory('AuthInterceptor', ['TokenManager', function(TokenManager) {
  return {
    request: function(config) {
      var token = TokenManager.getToken();
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    }
  };
}]);