const fs			= require('fs');						//file system
const path			= require('path');						//path

module.exports = function (app, knex, passport) {

    // rota principal (raiz)
    app.get('/', function(req, res, next) {
        res.render('index');                                // envia o arquivo index.html
    });

    // rota cursos, aqui entregamos o conteúdo do arquivo cursos.json
    app.get('/cursosJSON', function(req, res, next) {
	    if( !req.isAuthenticated() ){                       // se "não" estiver logado
            return res.json({ logado: false });             // envia um json informando
        }
        // do contrário segue abaixo
        const origem = path.join( __dirname, '..' ,'base', 'curso.json' );
        fs.readFile(origem, 'utf8', function (err, data) {  // abre o arquivo de modo assíncrono
            if (err){ throw err; }                          // verifica se deu algum erro
            const cursos = JSON.parse(data);                // passa os cursos para objeto
            return res.json( cursos );                      // envia os cursos para o navegador
        });
    });

    // rota para a verificação do estado atual da sessão
    app.get('/logado', function(req, res, next) {
        const logado = req.isAuthenticated();       // variável indicando se está logado
        return res.json({ logado: logado });        // retorna json com a variável
    });

    // rota para o login
    app.post('/login', function(req, res, next) {
	    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}, function(err, user, info) {
            if(err || !user) {
                return res.json({erro: 'Dados de login não conferem!' });
            }
            return req.logIn(user, function(err) {
                if(err) {
                    return res.json({erro: 'Dados de login não conferem!' });
                } else {
                    req.session.passport.nome = user.NOME;
                    res.json({ sucesso: 'sim' });
                }
            });
	    })(req, res, next);
    });

    // rota para realizar o cadastro de um usuário
    app.put('/cadastrar', function(req, res, next) {
        const campos = [
            {
                campo: 'nome',
                regex: /^[a-záàâãéèêíïóôõöúçñ]([-']?[a-záàâãéèêíïóôõöúçñ]+)*( [a-záàâãéèêíïóôõöúçñ]([-']?[a-záàâãéèêíïóôõöúçñ]+)*)+$/i,
                menor: 3,
                maior: 80,
                alias: 'Nome',
                valor: ''
            },
            {
                campo: 'sexo',
                regex: /^M$|^F$/,
                menor: 1,
                maior: 1,
                alias: 'Sexo',
                valor: ''
            },
            {
                campo: 'nascimento',
                regex: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
                menor: 10,
                maior: 10,
                alias: 'Data de Nascimento',
                valor: ''
            },
            {
                campo: 'email',
                regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                menor: 6,
                maior: 255,
                alias: 'E-mail',
                valor: ''
            },
            {
                campo: 'password',
                regex: /^[a-f0-9]{32}$/, // validamos a hash que já vai vir pronta
                menor: 32,
                maior: 32,
                alias: 'Senha',
                valor: ''
            }

        ];

        campos.forEach(function(part, index){                           // para cada campo
            if( !(part.campo in req.body) ){                            // verifica se foi RECEBIDO
                let msg = 'Erro! Verifique os dados preenchidos';       // mensagem de erro
                return res.json({ erro: msg });                         // finaliza com a mensagem
            }else{                                                      // se foi recebido
                part.valor = req.body[part.campo];                      // pega o valor
                if( !part.regex.test(part.valor) ){                     // nome fora do esperado
                    let msg = `Confira o campo ${part.alias}.`;         // mensagem de erro
                    return res.json({ erro: msg });                     // finaliza com a mensagem
                }
                if( part.valor.length < part.menor ){                   // valor menor que o esperado
                    let msg = `Confira o campo ${part.alias}.`;         // mensagem de erro
                    return res.json({ erro: msg });                     // finaliza com a mensagem
                }
                if( part.valor.length > part.maior ){                   // valor maior que o esperado
                    let msg = `Confira o campo ${part.alias}.`;         // mensagem de erro
                    return res.json({ erro: msg });                     // finaliza com a mensagem
                }
                if( part.campo === 'nascimento' ){                      // verificação especial
                    let n = part.valor.split('/').reverse().join('-');  // normaliza a data
                    part.valor = n;                                     // guarda a data no padrão
                    n = +new Date( n );                                 // objeto data
                    let idade = ~~((Date.now() - n) / (31557600000));   // idade
                    if( idade < 18 ){                                   // menor de 18 anos
                        let msg = `Confira o campo ${part.alias}.`;     // mensagem de erro
                        return res.json({ erro: msg });                 // finaliza com a mensagem
                    }
                }
            }
        });

        // se chegou até aqui, está tudo OK com os campos.
        let sql = "BEGIN :ret := GERAID(:emai,:nome,:sexo,:nasc,:senh); END;";
        knex.raw(sql, {
            ret: "SBBHQK____Calling__planet__Earth", 
            nome: campos[0].valor,
            sexo: campos[1].valor,
            nasc: campos[2].valor,
            emai: campos[3].valor,
            senh: campos[4].valor
        }).then( function(){
            return res.json({ sucesso: true });
        });

        /*if(typeof req.body.email !== 'undefined'){
            
            //procura no banco por alguem com esse email
            //insere o email no banco, usando a senha
            return res.json({ sucesso: 'sim' });
            
        }else{
            return res.json({ erro: 'Erro! Tente novamente mais tarde.' });
        }*/
        
        
    });

    // rota para fazer o logout
    app.get('/sair', function(req, res, next) {
        if(req.isAuthenticated()) {                     // se estiver logado
            res.clearCookie('login');                   // limpa o cookie
            req.logout();                               // efetua o logout
        }
        return res.sendStatus(200);                     // envia código 200 OK
    });

    // rota para as páginas não encontradas (qualquer rota que não esteja acima)
    app.use(function(req, res, next) {
        res.status(404);                                // envia código 404 para o navegador
        res.redirect('/');                              // redireciona para o login
    });

};