# Legião Pluviarcana

## Sobre o projeto
Sprint Session 2023.1. Este repositórios contém o código usado na admin page do do projeto.

Versão final do projeto:
[Página de Administrador](https://sprint-2023-1.vercel.app/)

## Executando o projeto localmente

Primeiramente realize o download do [Node.js](https://nodejs.org/en). 

Clone o repositório e instale as dependências executando os seguintes comandos no terminal:

```bash
git clone https://github.com/marchettomarcelo/sprint-2023.1.git
npm install
```

Execute o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Para rodar o projeto com você precisará de diversos outros serviços:

- Uma conexão com um banco de dados PostgreSQL
- Um servidor de e-mail
- Um serviço de upload de arquivos


Nós optamos por utilizar o SendGrid como servidor de e-mail e o UploadThing como serviço de upload de arquivos. Para configurar o projeto para utilizar esses serviços, você precisará criar uma conta no SendGrid e no UploadThing. Após criar as contas, você precisará configurar as variáveis de ambiente necessárias para o projeto. Você pode fazer isso criando um arquivo `.env` na raiz do projeto e adicionando as variáveis de ambiente necessárias. Você pode encontrar uma lista das variáveis de ambiente necessárias abaixo.


### Variáveis de ambiente necessárias

`DATABASE_URL`: Esta variável representa a URL de conexão com o banco de dados. É usada para configurar a conexão com o banco de dados utilizado no projeto T3.

`NEXTAUTH_SECRET`: Esta variável é usada pelo NextAuth.js, um framework de autenticação utilizado no projeto T3. O NEXTAUTH_SECRET é uma chave secreta usada para assinar tokens de autenticação e cookies.

`NEXTAUTH_URL`: Esta variável define a URL base do aplicativo. É usada pelo NextAuth.js para construir URLs corretas durante o processo de autenticação.

`EMAIL_SERVER_USER`: Essa variável armazena o nome de usuário utilizado para autenticação no servidor de e-mail. É usada para configurar o servidor de e-mail usado para enviar e-mails no aplicativo T3.

`EMAIL_SERVER_PASSWORD`: Essa variável armazena a senha associada ao nome de usuário utilizado para autenticação no servidor de e-mail. Também é usada na configuração do servidor de e-mail para fins de autenticação.

`EMAIL_SERVER_HOST`: Esta variável define o endereço do servidor de e-mail utilizado para enviar e-mails no aplicativo T3.

`EMAIL_SERVER_PORT`: Essa variável especifica a porta utilizada para se conectar ao servidor de e-mail.

`EMAIL_FROM`: Esta variável define o endereço de e-mail que será exibido como o remetente ao enviar e-mails a partir do aplicativo T3.

`UPLOADTHING_SECRET`: Esta variável é uma chave secreta usada pelo UploadThing, uma ferramenta ou serviço de upload de arquivos. É usada para assinar e verificar as solicitações de upload de arquivos.

`UPLOADTHING_APP_ID`: Esta variável representa o ID do aplicativo UploadThing. É usada para identificar o aplicativo ao se comunicar com o serviço de upload de arquivos.
