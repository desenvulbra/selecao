import UlbraService from './services/ulbraService';

start.$inject = ['$transitions', 'UlbraService'];

export default function start($transitions, UlbraService) {
    //Quando fizer um cold reload, verifica se está logado
    $transitions.onStart({ to: 'cursos' }, function(trans) {
        var $state = trans.router.stateService;
        return UlbraService.getLogado().then(function(res){
            var logado = res.data.logado;
            if(logado){ return true; }
            return $state.target('login');
        });
    });
    $transitions.onStart({ to: 'login' }, function(trans) {
        var $state = trans.router.stateService;
        return UlbraService.getLogado().then(function(res){
            var logado = res.data.logado;
            if(logado){ return $state.target('cursos'); }
            return true;
        });
    });
}