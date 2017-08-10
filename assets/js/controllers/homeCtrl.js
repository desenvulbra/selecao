app.controller('HomeCtrl', ['Auth', 'toastr', '$state', function(Auth, toastr, $state) {
  var $ctrl = this;
  $ctrl.submitting = false;

  $ctrl.login = function() {
    $ctrl.submitting = true;
    Auth.authenticate($ctrl.email, $ctrl.senha)
      .then(function(response) {
        Auth.saveToken(response.data.token);
        toastr.success('Usuário autenticado com sucesso.');
        $state.go('cursos');
      })
      .catch(function(response) {
        $ctrl.submitting = false;
        var errorMessage = response.data.message;
        toastr.error(errorMessage);
      });
  }

  $ctrl.googleSignIn = function() {
  }
}]);