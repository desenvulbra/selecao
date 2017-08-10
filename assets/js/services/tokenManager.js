app.factory('TokenManager', ['$window', function ($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['jwtToken'] = token;
    },
    getToken: function() {
      return $window.localStorage['jwtToken'];
    }
  };
}]);