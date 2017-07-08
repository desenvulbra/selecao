Sobre o projeto
===============

Este projeto é dividido em duas partes, a primeira consiste na aplicação NodeJS que irá servir os arquivos estáticos e também atuará como uma API, realizando a autenticação do usuário.

A segunda parte é composta pela aplicação Angular. Nela o usuário poderá se cadastrar, fazer login e obter acesso a lista de cursos.

O sistema foi desenvolvido, em sua maior parte, com JavaScript, utilizando ExpressJS, Angular 1.2, KnexJS (ORM), PassportJS (Autenticação). O template foi criado pelo time de desenvolvimento da Ulbra e sofreu algumas modificações para se adaptar ao Angular.



ESTRUTURA DE DIRETÓRIOS
-----------------------

        .
    ├── app                     # Aplicação angular
    │   ├── modules
    │   │   ├── cadastro        # Módulo cadastro
    │   │   ├── cursos          # Módulo cursos
    │   │   ├── login           # Módulo login
    │   │   └── sair            # Módulo de logout
    │   ├── partials            # Views parciais
    │   ├── services            # Serviços
    │   ├── styles              # Folhas de estilo CSS
    │   ├── app.js              # Inicialização da Aplicação Angular
    │   ├── config.js           # Configurações do router
    │   └── start.js            # Verificação cold reload
    ├── base
    │   └── curso.json          # Arquivo JSON contendo os cursos
    ├── ddl
    │   ├── funcao.sql          # Função PLSQL para a geração do ID
    │   ├── sequencia.sql       # Gerador de números sequenciais
    │   └── tabela.sql          # Script para a criação da Tabela de Usuários
    ├── dist
    │   └── index.html          # Arquivo index que carregará o bundle.js
    ├── rotas
    │   └── rotas.js
    ├── .babelrc                # Configuração do babelJS
    ├── .gitignore              # Arquivos e pastas ignorados pelo git
    ├── index.js                # Servidor Web NodeJS
    ├── package.json            # Módulos NPM utilizados
    ├── PROJECT.md              # Este arquivo
    ├── README.md               # Instruções Originais da Ulbra
    └── webpack.config.js       # Configurações do WebPack



REQUERIMENTO
------------

Lista de itens requeridos para a execução deste projeto:

 * NodeJS versão 6.11.0 [link](https://nodejs.org/)
 * Oracle 11g XE (ou outra versão compatível) [link](http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html)
 * Oracle Instant Client [link](http://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.html)

Também se faz necessário a instalação global dos seguintes módulos via NPM:

 * Node-gyp
 * Webpack

``` bash
$ npm install -g node-gyp
$ npm install -g webpack
```



PREPARAÇÃO
----------

Por motivos de segurança, a senha de acesso ao Oracle fica numa variável de ambiente, sendo assim é necessário informá-la:

``` bash
$ export PWD_ORACLE=senha_do_oracle_aqui
```

Outros dados de acesso ao banco, como usuário e endereço podem ser inseridos dentro do arquivo `index.js`.



INSTALAÇÃO
----------


### Clonar repositório

``` base
git clone https://github.com/AndersonBargas/selecao-analista-sistemas-web-2017.git
```


### ... ou Instalação a partir do Arquivo

Extraia o arquivo que pode ser baixado clicando [aqui](https://github.com/AndersonBargas/selecao-analista-sistemas-web-2017/archive/master.zip) para
um diretório local.


### Continuando com a instalação

Agora basta executarmos:

``` bash
$ npm install
$ webpack
$ npm start
```

Se tudo deu certo, você poderá acessar o projeto a partir do seguinte endereço URL:

~~~
http://localhost:8080
~~~

É importante que se use o endereço `localhost` e a porta `8080`, pois foi este o endereço configurado no Google Developer. Qualquer endereço diferente deste causará uma falha no login via conta Google.


**OBSERVAÇÕES:**
- A instalação do driver Oracle pode ser um tanto complicada. Após um dia inteiro tentando compilar o driver no Windows, instalei o Fedora 25 e a compilação funcionou de primeira. Portanto recomendo que execute este projeto em ambiente Linux, 64 bits (só existe versão 64 bits do Oracle 11g XE).