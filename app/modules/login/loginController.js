import md5 from 'md5';
import $ from 'jquery';


export default class LoginController {
    constructor($http, $state, toaster) {
        this.enviando = false;
        this.$http = $http;
        this.$state = $state;
        this.toaster = toaster;
    }

    entrar(){
        if( this.enviando === true ){ return false; }
        this.enviando = true;

        let vm = this;
        let xsrf = $.param({ username: this.username, password: md5(this.password) })

        this.$http({
            method: 'POST',
            url: '/login',
            data: xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(resp){
            let resposta = resp.data;
            if( typeof resposta.sucesso !== 'undefined' ){
                vm.$state.go('cursos', {});
            }else{
                let erro = '';
                if( typeof resposta.erro !== 'undefined' ){ erro = resposta.erro; }else{ erro = 'Ocorreu um erro crítico. Tente mais tarde.'; }
                vm.toaster.pop({
                    type    : 'error',
                    title   : 'Erro',
                    body    : erro,
                    timeout : 3000
                });
                vm.enviando = false;
            }
        });
    }

}