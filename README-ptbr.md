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
* [Estrutura de Pastas](#folder-structure);
* [Capturas de Tela](#screenshots);
* [Versão EN-US](https://github.com/Mfrozzz/App-recipe/blob/master/README.md);

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
    * Docker: Caso prefira usar o Docker, execute o comando abaixo para criar e iniciar um contêiner PostgreSQL:
    ```shell
        docker run --name postgresql -e POSTGRES_PASSWORD=password -d -p 5432:5432 user
    ```
    * --name: Define o nome do contêiner como "postgresql".
    * -e POSTGRES_PASSWORD=password: Define a senha do usuário "postgres".
    * -d: Executa o contêiner em segundo plano.
    * -p 5432:5432: Mapeia a porta 5432 do contêiner para a porta 5432 do host.
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
        SECRET_KEY="sua_chave_criptografia"
        EMAIL_USER="email@mail.com"
        EMAIL_PASS="sua_senha"
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
    npx prisma db push
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

## <span id="folder-structure">Estrutura de Pastas</span>

```
App-recipe/
├── backend/
|    └── Estrutura de Pastas do Back-end
├── frontend/
|    └── Estrutura de Pastas do Front-end
├── .gitignore
├── README-ptbr.md
└── README.md
```

## <span id="screenshots">Capturas de Tela</span>

Aqui estão algumas capturas de tela do sistema para ilustrar suas funcionalidades:

1. **Página Inicial**  
   A página inicial exibe categorias populares de receitas e permite navegar facilmente.  
   ![HomePage](./screenshots/HomePage.png)

2. **Página de Receitas**  
   Permite buscar receitas, visualizar os resultados e gerenciar receitas favoritas.  
   ![RecipesPage](./screenshots/RecipesPage.png)

3. **Modal de Receita**  
   Exibe os detalhes de uma receita específica, como ingredientes e instruções.  
   ![ModalCard](./screenshots/ModalCard.png)

4. **Página de Login**  
   Permite que os usuários façam autenticação para acessar suas receitas favoritas.  
   ![LoginPage](./screenshots/LoginPage.png)

5. **Página de Registro**  
   Permite que novos usuários criem uma conta.  
   ![SignUpPage](./screenshots/SignUpPage.png)

6. **Página de Esqueci Minha Senha**  
   Permite que os usuários solicitem a redefinição de senha.  
   ![ForgotPasswordPage](./screenshots/ForgotPasswordPage.png)

7. **Página de Redefinição de Senha**  
   Permite que os usuários redefinam suas senhas usando um token.  
   ![ResetPasswordPage](./screenshots/ResetPasswordPage.png)

8. **Seção de Favoritos**  
   Exibe as receitas favoritas do usuário.  
   ![FavouriteSection](./screenshots/FavouriteSection.png)

9. **Página de Perfil do Usuário**  
   - Visualização das informações do usuário.
   ![UserProfilePage](./screenshots/UserProfilePage.png)
   - Atualização das informações do usuário.
   ![UpdateUserInfo](./screenshots/UpdateUserPage.png)

10. **Dropdown do Usuário**  
    Menu suspenso para acessar configurações e logout.  
    ![UserDropdown](./screenshots/UserDropdown.png)

11. **Componentes de Feedback**  
    - **Toast de Sucesso**: Exibe mensagens de sucesso.  
      ![SuccessToast](./screenshots/SuccessToast.png)  
    - **Toast de Erro**: Exibe mensagens de erro.  
      ![ErrorToast](./screenshots/ErrorToast.png)

12. **Modo Escuro**  
    Interface do sistema no modo escuro.  
    ![DarkMode](./screenshots/DarkMode.png)

13. **Componente de Carregamento**  
    Exibe um spinner enquanto os dados estão sendo carregados.  
    ![LoadingComponent](./screenshots/LoadingComponent.png)

14. **Lista de Cartões de Receita**  
    Exibe uma lista de receitas em formato de cartões.  
    ![RecipeCards](./screenshots/RecipeCards.png)

15. **Favoritos Vazios**  
    Exibe uma mensagem quando o usuário não possui receitas favoritas.  
    ![EmptyFavourite](./screenshots/EmptyFavourite.png)