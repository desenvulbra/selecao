app.controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'md5', 'ngToast', function($scope, $rootScope,$state, $stateParams, $http, md5, ngToast) {
    
    if( typeof $stateParams.login === 'object' ){
        $scope.login = $stateParams.login;
    }

    $scope.enviando = false;
    
    $scope.entrar = function(){
        if( $scope.enviando === true ){ return false; }
        $scope.enviando = true;

        var login = angular.copy($scope.login);
        login.password = md5.createHash(login.password);

        var xsrf = $.param( login );
        $http({
            method: 'POST',
            url: '/login',
            data:  xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(resp){
            var resposta = resp.data;
            if( typeof resposta.sucesso !== 'undefined' ){
                $state.go('cursos', {});
            }else{
                var erro = '';
                if( typeof resposta.erro !== 'undefined' ){ erro = resposta.erro; }else{ erro = 'Ocorreu um erro crítico. Tente mais tarde.'; }
                ngToast.create({ className: 'danger', content: erro });
                $scope.enviando = false;
            }
        });
    }

}]);




app.controller('CadastroCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'ngToast', function($scope, $rootScope,$state, $stateParams, $http, ngToast) {
    
    $scope.enviando = false;

    $scope.cadastrar = function(){
        if( $scope.enviando === true ){ return false; }
        $scope.enviando = true;
        
        var login = $scope.login;

        var xsrf = $.param( login );
        $http({
            method: 'PUT',
            url: '/cadastrar',
            data: xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(resp){
            var resposta = resp.data;
            if( typeof resposta.sucesso !== 'undefined' ){
                $state.go('login', {login: { username: login.email, password: login.senha}}); 
            }else{
                var erro = '';
                if( typeof resposta.erro !== 'undefined' ){ erro = resposta.erro; }else{ erro = 'Ocorreu um erro crítico. Tente mais tarde.'; }
                ngToast.create({ className: 'danger', content: erro });
            }
        });
    }

}]);