app.controller('CadastroCtrl', ['Auth', 'TokenManager', 'toastr', '$state', function(Auth, TokenManager, toastr, $state) {
	var $ctrl = this;
	$ctrl.submitting = false;
	$ctrl.errorMessage = {};

	$ctrl.usuario = {
		sexo: null
	};

	$ctrl.cadastrar = function() {
    $ctrl.submitting = true;
    Auth.register($ctrl.usuario)
      .then(function(response) {
        TokenManager.saveToken(response.data.token);
        toastr.success('Usuário autenticado com sucesso.');
        $state.go('cursos');
      })
      .catch(function(response) {
        $ctrl.submitting = false;
				$ctrl.errorMessage = {};
				angular.forEach(response.data, function(message, field) {
					$ctrl.form[field].$setValidity('server', false);
					$ctrl.errorMessage[field] = message;
				});
      });
	}
}]);