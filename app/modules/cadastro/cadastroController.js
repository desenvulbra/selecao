import md5 from 'md5';
import $ from 'jquery';

export default class CadastroController {
    constructor($http, $state, toaster) {
        this.enviando = false;
        this.$http = $http;
        this.$state = $state;
        this.toaster = toaster;
    }

    idade(){
        let nasc = this.nascimento;
        if( typeof nasc !== 'undefined' ){
            nasc = nasc.split('/').reverse().join('-');
            let nascDate = +new Date( nasc );
            let idade = ~~((Date.now() - nascDate) / (31557600000));
            this.nascValido = ( idade >= 18 );
        }else{
            this.nascValido = false;
        }
    }

    confirma(){
        let p = this.password;
        let c = this.confirmacao;
        this.confValido = ( p === c );
    }

    cadastrar(){
        if( this.enviando === true ){ return false; }
        this.enviando = true;

        let vm = this;
        let xsrf = $.param({
            nome        : this.nome,
            sexo        : this.sexo,
            nascimento  : this.nascimento,
            email       : this.email,
            password    : md5(this.password)
        });

        this.$http({
            method: 'PUT',
            url: '/cadastrar',
            data: xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(resp){
            let resposta = resp.data;
            if( typeof resposta.sucesso !== 'undefined' ){
                vm.$state.go('login', { username: vm.nome, password: vm.password });
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