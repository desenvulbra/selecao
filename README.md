<p align="center">
  <a href="http://www.ulbra.br">
    <img src="http://i.imgur.com/zOkWT06.png" title="ULBRA" />
  </a>  
</p>

___

# Seleção para Analista de Sistemas Web 2017

## Processo de recrutamento

Olá, pronto para participar do nosso processo de recrutamento para vaga de Analista de Sistemas/Desenvolvedor (CLT)?

### Sobre a Vaga

- Empresa: ULBRA
- Cargo: Analista de Sistemas/Desenvolvedor (CLT);
- Salário compatível com a função
- Horário: 08:00h às 12:00h – 13:00h às 17:48h (de segunda a sexta)
- Refeitório no local
- Vale transporte ou estacionamento
- 80% desconto na Faculdade
- Local: ULBRA – Campus Canoas (www.ulbra.br)

### Requisitos para a vaga

Domínio em:

- Angular v. 1.2
- Node
- Git
- PL/SQL 
- Banco de Dados Oracle

## A Atividade

Um usuário quer se inscrever em uma plataforma de ensino à distância e ter acesso aos cursos disponíveis.

O que esperamos que seja desenvolvido:

1)	Uma página para login na plataforma, com possibilidade de login através do Google e criação de novo usuário
2)	Uma página para que o usuário possa se cadastrar na plataforma
3)	Uma página para apresentar os cursos disponíveis para o usuário, após o usuário entrar na plataforma

### Início

Faça o fork do desafio

### Layout

<p align="center">
  <img src="http://i.imgur.com/MROnFoh.jpg" alt="Tela de login" width="400px"/>      
  <br>
  Tela de login
  <br>
  <br>
  <br>  
  <img src="http://i.imgur.com/BQLjiiK.jpg" alt="Tela de cadastro de usuário" width="400px"/>  
  <br>
  Tela de cadastro de usuário
  <br>
  <br>
  <br>  
  <img src="http://i.imgur.com/eB6XDlL.jpg" alt="Tela de cadastro de usuário" width="400px"/>  
  <br>
  Tela de apresentação de cursos
  <br>
  <br>
  <br>
</p>


### Dados

Deverá ser realizada a construção de uma API REST, em Node, para consumir os dados no Front-end (Angular)

Os dados do usuário serão consumidos de um banco de dados Oracle

Tabela USUARIO:

| Propriedade   | Tipo          | Descrição                                   |
| ------------- |:-------------:| --------------------------------------------|
| `id`          | Varchar2(255) | Id do usuário                               |
| `email`       | Varchar2(255) | Email/login do usuário                      |
| `nome`        | Varchar2(80)  | Nome do usuário                             |
| `sexo`        | Varchar2(1)   | Sexo do usuário – M ou F                    |
| `nascimento`  | Date          | Data de nascimento do usuário (dd/mm/yyyy)  |
| `senha`       | Varchar2(32)  | Senha do usuário criptografada              |


Os dados dos cursos disponíveis estão no JSON:

base/curso.json

| Propriedade   | Tipo          | Descrição                                   |
| ------------- |:-------------:|---------------------------------------------|
| `id`          | Varchar2(255) | Id do curso                                 |
| `nome`        | Varchar2(255) | Nome do curso                               |

### Especificações sobre o desenvolvimento

#### 1)	Tela de login

- Caso o usuário efetue login através dos campos da própria plataforma, 
deve ser validado no banco de dados se o usuário e senha informados estão corretos. 
A senha deve ser criptografada em MD5 gerando um HASH de 32 dígitos antes de trafegar através da API REST de login
- Se o usuário optar for fazer login com o Gmail, deverá ser utilizada a API de login do Google. 
- Se o login obtiver sucesso, liberar o acesso do usuário à tela de apresentação de cursos 
caso contrário apresentar mensagem para o usuário na tela de login

#### 2)	Tela de cadastro de usuário

##### Front-end

  Realizar as seguintes validações:

- Somente maiores de 18 anos podem se cadastrar 
- O e-mail do usuário é único no sistema
- A senha deve possuir no mínimo 8 caracteres e possuir uma letra maiúscula, um número e um caractere especial

##### Back-end

- Realizar as mesmas validações do front-end
- O Id do usuário deverá ser gerado através de uma função no banco de dados. 
Seu retorno será um varchar2 contendo a criptografia em MD5 de um número sequencial + data de geração+ Token (sBBHcK) 
gerando um HASH de 32 dígitos.  
- A senha informada deve ser criptografada em MD5 gerando um HASH de 32 dígitos


#### 3)	Tela de apresentação de cursos

- Somente será possível acessar essa tela caso o usuário tenha efetuado o login com sucesso
- Os dados dos cursos devem ser lidos a partir do arquivo curso.json disponibilizado

## Avaliação

O que vamos avaliar:

- Eficiência 
-	Eficácia
-	Desempenho
-	Organização
-	Boas práticas
-	Testes unitários e utilização de features do Ecmascript 6 serão um diferencial

## Entrega

O processo de entraga da atividade deve ser:

1)	Crie um PROJECT.md com a explicação de como devemos executar o projeto, 
com o máximo de detalhes possível do que foi feito e a documentação da API REST
2)	Os scripts de criação da tabela USUARIO e do procedimento de criação de ID do usuário 
no banco de dados devem estar contidos no projeto
3)	Após concluir faça um pull request
5)	Envie um e-mail para vagasulbrati@ulbra.br com o assunto “Atividade de seleção para Analista de Sistemas” 
com seu currículo, pretensão salarial e o link do seu pull request

__

Qualquer dúvida entre em contato com nossa equipe pelo e-mail vagasulbrati@ulbra.br 
com o assunto “Dúvidas atividade de seleção para Analista de Sistemas”.

