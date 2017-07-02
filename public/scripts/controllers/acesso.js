app.controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'md5', 'ngToast', function($scope, $rootScope,$state, $stateParams, $http, md5, ngToast) {
    
    if( typeof $stateParams.login === 'object' ){
        $scope.login = $stateParams.login;
    }

    $scope.enviando = false;
    
    $scope.entrar = function(){
        if( $scope.enviando === true ){ return false; }
        $scope.enviando = true;

        var login = $scope.login;
        var raw = login.password;
        login.password = md5.createHash(raw);
        
        var xsrf = $.param( login );
        $http({
            method: 'POST',
            url: '/login',
            data:  xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(resp){
            var resposta = resp.data;
            if( typeof resposta.sucesso !== 'undefined' ){
                if( $rootScope.redirecionar ){//já tem uma url na espera
                    var u = $rootScope.redirecionar;//pega a url
                    var i = $rootScope.redirecionarId;//pega o parametro
                    var p = {};//gera um objeto em branco
                    if( i ){ p.id = $rootScope.redirecionarId; }//se tiver parametro, insere no objeto
                    $rootScope.redirecionar = undefined; //limpa o rootScope
                    $rootScope.redirecionarId = undefined; //limpa o rootScope
                    $state.go(u, p);

                }else{
                    $state.go('cursos', {});
                }
                 
            }else{
                var erro = '';
                if( typeof resposta.erro !== 'undefined' ){ erro = resposta.erro; }else{ erro = 'Ocorreu um erro crítico. Tente mais tarde.'; }
                ngToast.create({
                    className: 'danger',
                    content: erro
                });
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
                ngToast.create({
                    className: 'danger',
                    content: erro
                });
            }
        });
    }

}]);