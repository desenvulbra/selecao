app.factory('TokenManager', ['$window', function ($window) {
  return {
    isAuthenticated: function() {
      var token = this.getToken();
      if (token) {
        var params = this.parseToken(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    },
    parseToken: function(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    },
    saveToken: function(token) {
      $window.localStorage['jwtToken'] = token;
    },
    getToken: function() {
      return $window.localStorage['jwtToken'];
    }
  };
}]);