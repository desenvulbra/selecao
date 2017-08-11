## Configuração do Ambiente

No desenvolvimento deste projeto, foram utiliadas as seguintes dependências. 
Abaixo estão listadas as principais, juntamente com suas versões. 
Dependências e diretivas auxiliares podem ser conferidas no arquivo `package.json`.
Todas foram instaladas através do NPM.

- AngularJS v1.6.5
- Express v4.15.2
- NodeJS v8.2.1
- Extensão OracleDB para NodeJS v1.13.1

O projeto foi desenvolvido e executado em uma máquina rodando macOS 10.12.6. 
Devido a falta de suporte para Mac, foi utilizado uma VM Vagrant (https://github.com/hilverd/vagrant-ubuntu-oracle-xe) para disponibilizar uma instância do Oracle Express Edition 11g.

## Organização do Projeto

* `assets/js` -- Arquivos JS do AngularJS;
* `public` -- Pasta pública do projeto, contém folhas CSS, views HTML e arquivos JS já minificados;
* `routes/auth.js` -- Rotas de autenticação e registro de usuários;
* `routes/cursos.js` -- Rotas para listagem de cursos;
* `sql/` -- Diretório com os scripts SQL para criação das tabelas;
* `views/` -- Diretório com as views Jade do Express;
* `config.js` -- Configuração de acesso ao banco e ID do projeto no Google Console.

Foi utilizado o Gulp para concatenar e minificar as dependências de terceiros (vendor), criando um arquivo `public/js/vendor.js` com todas elas. 
O mesmo é feito com as folhas de estilo, no arquivo `public/css/vendor.css`. 
E com os arquivos JS do AngularJS, onde é gerado o arquivo `public/js/app.js` 

## API REST

`POST /api/auth/login`

Autenticação do usuário por e-mail e senha. Em caso de sucesso, retorna um token JWT que deve ser enviado em todas as próximas requisições. Em caso de falha na validação ou na consulta ao banco, é retornado o código HTTP 500.

`POST /api/auth/google-signin`

Autenticação do usuário através do botão Google. Recebe como parâmetro um token obtido assim que o usuário concede permissão, através da caixa de lógin do Google. Em caso de sucesso, retorna um token JWT que deve ser enviado em todas as próximas requisições. Em caso de falha na validação ou na consulta ao banco, é retornado o código HTTP 500.

`POST /api/auth/register`

Esta rota é utilizada para registrar novos usuários. Recebe o nome, e-mail, senha, data de nascimento e sexo. Em caso de sucesso, retorna um token JWT que deve ser enviado em todas as próximas requisições. Em caso de falha na validação ou na consulta ao banco, é retornado o código HTTP 500.

`GET /api/cursos`

Retorna os cursos que estão salvos na tabela CURSO. Para utilizar esta rota, é necessário que o usuário esteja logado, portando é enviado um token JWT no cabeçalho `Authorization` da requisição. Caso este token não seja válido é retornado o código HTTP 403.

## Executando o Projeto

Depois de configurar os dados do banco no arquivo `config.js` basta rodar os comandos abaixo para baixar dependências e iniciar o projeto. O projeto roda no endereço `http://localhost:3000`.

```bash
npm install 
npm start 
```