app.controller('CursosCtrl', ['Curso', 'toastr', function(Curso, toastr) {
  var $ctrl = this;

  $ctrl.cursos = [];
  Curso.obterCursos()
    .then(function(response) {
      $ctrl.cursos = response.data;
    })
    .catch(function() {
      toastr.error('Falha ao carregar os cursos.');
    });
}]);