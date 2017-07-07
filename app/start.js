start.$inject = ['$transitions', 'UlbraService'];           // injeção

export default function start($transitions, UlbraService) { // verificação cold reload
    $transitions.onStart({ to: 'cursos' }, function(trans) {// quando ir para cursos
        var $state = trans.router.stateService;             // objeto para redirecionar
        return UlbraService.getLogado().then(function(res){ // consulta o serviço
            var logado = res.data.logado;                   // logado?
            if(logado){ return true; }                      // mantêm a rota
            return $state.target('login');                  // redireciona para login
        });
    });
    $transitions.onStart({ to: 'login' }, function(trans) { // quando ir para login
        var $state = trans.router.stateService;             // objeto para redirecionar
        return UlbraService.getLogado().then(function(res){ // consulta o serviço
            var logado = res.data.logado;                   // logado?
            if(logado){ return $state.target('cursos'); }   // redireciona para cursos
            return true;                                    // mantêm a rota
        });
    });
}