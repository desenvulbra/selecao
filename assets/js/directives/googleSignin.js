app.directive('googleSignin', ['$window', '$parse', function($window, $parse) {
  return {
    link: function(scope, element, attributes, ngModel) {
      $window.gapi.load('auth2', function(){
        auth2 = gapi.auth2.init({
          client_id: '1084687228436-ledm4qf98qajvpm5rcdlrior7p4ujde1.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        attachSignin();
      });

      function attachSignin() {
        auth2.attachClickHandler(element[0], {},
          function(googleUser) {
            $parse(attributes.googleSignin)(scope, {
              token: googleUser.getAuthResponse().id_token
            });
          }, function(error) {
            $parse(attributes.onError)(scope, {
              error: error
            });
          });
      }
    }
  };
}]);