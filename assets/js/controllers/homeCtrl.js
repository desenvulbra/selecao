app.controller('HomeCtrl', ['Auth', 'TokenManager', 'toastr', '$state', function(Auth, TokenManager, toastr, $state) {
  var $ctrl = this;
  $ctrl.submitting = false;

  $ctrl.login = function() {
    $ctrl.submitting = true;
    Auth.authenticate($ctrl.email, $ctrl.senha)
      .then(function(response) {
        TokenManager.saveToken(response.data.token);
        toastr.success('Usuário autenticado com sucesso.');
        $state.go('cursos');
      })
      .catch(function(response) {
        $ctrl.submitting = false;
        var errorMessage = response.data.message;
        toastr.error(errorMessage);
      });
  }

  $ctrl.googleSignIn = function(token) {
    Auth.googleSignIn(token)
      .then(function(response) {
        TokenManager.saveToken(response.data.token);
        toastr.success('Usuário autenticado com sucesso.');
        $state.go('cursos');
      })
      .catch(function(response) {
        toastr.error('Ocorreu um erro ao fazer login. Tente novamente.');
      });
  }

  $ctrl.handleError = function() {
    toastr.error('Ocorreu um erro ao fazer login. Tente novamente.');
  }
}]);