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
        ['email', 'password', 'sexo', 'nome', 'nascimento'].forEach(function(part, index){
            if( !(part in req.body) ){
                return res.json({ erro: 'Erro! Verifique os dados preenchidos e tente novamente.' });
            }
        });
        let email = req.body.email;
        let senha = req.body.password;
        let sexo = req.body.sexo;
        let nome = req.body.nome;
        let nasc = req.body.nascimento;

        if( senha.length < 8 ){
            return res.json({ erro: 'Erro! A senha deve possuir no mínimo 8 caracteres.' });
        }

        if( sexo !== 'M' && sexo !== 'F' ){
            return res.json({ erro: 'Erro! Verifique o sexo selecionado.' });
        }

        if( nome.toString().trim().length === 0 ){
            return res.json({ erro: 'Erro! Nome não pode ficar em branco.' });
        }

        nasc = nasc.split('/').reverse().join('-');
        let nascimento = +new Date( nasc );
        let idade = ~~((Date.now() - nascimento) / (31557600000));
        if( idade < 18 ){
            return res.json({ erro: 'Erro! A idade mínima para cadastro é de 18 anos.' });
        }

        senha = md5(senha);

        console.log(req.body);
        knex('USUARIO')
        .insert({ EMAIL: email, NOME: nome, SEXO: sexo, NASCIMENTO: nasc, SENHA: senha })
        .then(
            function(){
                console.log('salvou!');
            }
        );
        /*if(typeof req.body.email !== 'undefined'){
            
            //procura no banco por alguem com esse email
            //insere o email no banco, usando a senha
            return res.json({ sucesso: 'sim' });
            
        }else{
            return res.json({ erro: 'Erro! Tente novamente mais tarde.' });
        }*/
        return res.sendStatus(200);
        
    });

    // rota para fazer o logout
    app.get('/sair', function(req, res, next) {
        if(req.isAuthenticated()) {                     // se estiver logado
            res.clearCookie('login');                   // limpa o cookie
            req.logout();                               // efetua o logout
            res.redirect('/');                          // redireciona para a raiz
        } else {                                        // se não estiver logado
            res.redirect('/');                          // apenas redireciona
        }
    });

    // rota para as páginas não encontradas (qualquer rota que não esteja acima)
    app.use(function(req, res, next) {
        res.status(404);                                // envia código 404 para o navegador
        res.redirect('/');                              // redireciona para o login
    });

};