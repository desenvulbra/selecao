app.controller('CursosCtrl', ['Curso', 'toastr', 'TokenManager', '$state', 'toastr', function(Curso, toastr, TokenManager, $state, toastr) {
  var $ctrl = this;

  $ctrl.cursos = [];
  Curso.obterCursos()
    .then(function(response) {
      $ctrl.cursos = response.data;
    })
    .catch(function() {
      toastr.error('Falha ao carregar os cursos.');
    });

  $ctrl.logout = function() {
    TokenManager.deleteToken();
    toastr.success('Sessão encerrada com sucesso.')
    $state.go('home');
  }
}]);