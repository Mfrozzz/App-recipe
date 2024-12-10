# App Recipe Tasty🥐Pick

O Tasty Pick é um app que permite a visualização de receitas dentro de um banco de dados, e juntamente disso do usuário pode salvar e destacar suas receitas as favoritando.
<br>
<br>
Esse app é construido a partir da divisão de frontend e backend, sendo o frontend construido em React (template de TypeScript) e Vite. Enquanto o backend é desenvolvido em node com TypeScript utilizando as bibliotecas cors, express, prisma e nodemon.
<br>
## Sumário 📄
* [Requisitos](#requisitos);
* [Configurando ambiente](#setting-up);
* [Backend](#backend);
* [Frontend](#frontend);
* [Mais Informações](#more-info);
<br>
<br>

## <span id="requisitos">Requisitos</span>

O aplicativo possui certos pré-requisitos para se dar seu inicio, dentre eles são:

* Git
* Node.js
* Chave da API da [Spoonacular](https://spoonacular.com/food-api)
* Banco de dados PostgreSQL (local ou em nuvem)

<br>

## <span id="setting-up">Configurando Ambiente</span>

1. Clonagem do repositório
```shell
    git clone https://github.com/Mfrozzz/App-recipe.git
```
2. Consiga a API do Spoonacular para conseguir acesso às receitas
    * Faça o registro no [Spoonacular](https://spoonacular.com/food-api) clicando em "Start Now"
3. Faça instalação do PostgreSQL em seu ambiente ou configure um banco de dados em nuvem, por exemplo:
    * [PostgreSQL](https://www.postgresql.org/download/)
    * [ElephantSQL](https://www.elephantsql.com/)
    * [Aiven](https://aiven.io/)
    * [Tembo](https://tembo.io/)
4. Inicialize o ambiente Node.js no frontend e no backend
    ```shell
        cd backend
        npm i
        cd ..
        cd frontend
        npm i
    ```
5. Crie o arquivo `.env` e adicione a porta de funcionamento do Backend, a URL do banco de dados e a chave da API
    * Exemplo:
    ```dotenv
        PORT=5000
        DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
        API_KEY=sua_api_key
    ```
6. Crie o Banco de dados em seu ambiente escolhido
    * Exemplo:
    ```shell
        CREATE DATABASE database_name;
    ```
7. Configure o Prisma
    ```
    npx prisma init
    npm prisma generate
    ```

<br>

## <span id="backend">Backend</span>

Para mais informações do Backend [Clique Aqui](https://github.com/Mfrozzz/App-recipe/tree/master/backend)

<br>

## <span id="frontend">Frontend</span>

Para mais informações do Frontend [Clique Aqui](https://github.com/Mfrozzz/App-recipe/tree/master/frontend)

<br>

## <span id="more-info">Mais informações</span>

> Baseado no projeto do [FreeCodeCamp🔥](https://www.freecodecamp.org/news/full-stack-project-create-a-recipe-app-using-react-node-js/)