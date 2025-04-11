# Back-end

Este é o back-end do aplicativo Tasty🥐Pick, desenvolvido em Node.js com TypeScript, utilizando Express e Prisma para gerenciar o banco de dados PostgreSQL.

## Sumário 📄
* [Requisitos](#requisitos)
* [Configurando Ambiente](#configurando-ambiente)
* [Endpoints](#endpoints)
* [Scripts](#scripts)
* [Estrutura de Pastas](#estrutura-de-pastas)
* [Versão EN-US](https://github.com/Mfrozzz/App-recipe/blob/master/backend/README.md)

## <span id="requisitos">Requisitos</span>

- Node.js
- PostgreSQL
- Chave da API da [Spoonacular](https://spoonacular.com/food-api)

## <span id="configurando-ambiente">Configurando Ambiente</span>

1. Clone o repositório:
    ```shell
    git clone https://github.com/Mfrozzz/App-recipe.git
    cd backend
    ```

2. Instale as dependências:
    ```shell
    npm install
    ```

3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```dotenv
    PORT=5000
    DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
    API_KEY=sua_api_key
    SECRET_KEY="sua_chave_criptografia"
    EMAIL_USER="email@mail.com"
    EMAIL_PASS="sua_senha"
    ```

4. Configure o Prisma:
    ```shell
    npx prisma generate
    npx prisma db push
    ```

5. Inicie o servidor:
    ```shell
    npm start
    ```

## <span id="endpoints">Endpoints</span>

### Autenticação

#### POST `/api/recipe/signup`
Registra um novo usuário.
- Request Body:
    ```json
    {
        "email": "user@example.com",
        "password": "password123",
        "name": "Test Exemple"
    }
    ```
- Response:
    ```json
    {
        "id": 1,
        "email": "user@example.com",
        "name": "Test Exemple"
    }
    ```

#### POST `/api/recipe/login`
Autentica um usuário e retorna um token JWT.
- Request Body:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- Response:
    ```json
    {
        "token": "jwt_token"
    }
    ```
    
#### POST `/api/recipe/requestPasswordReset`
Solicita a redefinição de senha para um usuário.
- Request Body:
    ```json
    {
        "email": "user@example.com"
    }
    ```
- Response:
    ```json
    {
        "message": "Password reset email sent"
    }
    ```

#### POST `/api/recipe/resetPassword`
Redefine a senha de um usuário usando um token.
- Request Body:
    ```json
    {
        "token": "jwt_token",
        "newPassword": "new_password123"
    }
    ```
- Response:
    ```json
    {
        "message": "Password reset successful"
    }
    ```

### Receitas

#### GET `/api/recipe/search`
Busca receitas com base em um termo de pesquisa.
- Query Params:
    - `searchTerm`: O termo de pesquisa.
    - `page`: O número da página.
- Response:
    ```json
    {
        "results": [
            {
                "id": 1,
                "title": "Recipe Title",
                "image": "image_url"
            }
        ]
    }
    ```

#### GET `/api/recipe/:recipeId/summary`
Obtém o resumo de uma receita específica.
- Path Params:
    - `recipeId`: O ID da receita.
- Response:
    ```json
    {
        "id": 1,
        "title": "Recipe Title",
        "summary": "Recipe summary..."
    }
    ```

### Receitas Favoritas

#### GET `/api/recipe/favourite`
Obtém todas as receitas favoritas do usuário.
- Headers:
    - `Authorization`: Bearer `jwt_token`
- Response:
    ```json
    {
        "results": [
            {
                "id": 1,
                "title": "Recipe Title",
                "image": "image_url"
            }
        ]
    }
    ```

#### POST `/api/recipe/favourite`
Adiciona uma receita aos favoritos do usuário.
- Headers:
    - `Authorization`: Bearer `jwt_token`
- Request Body:
    ```json
    {
        "recipeId": 1,
        "userId": 1
    }
    ```
- Response:
    ```json
    {
        "id": 1,
        "recipeId": 1,
        "userId": 1
    }
    ```

#### DELETE `/api/recipe/favourite`
Remove uma receita dos favoritos do usuário.
- Headers:
    - `Authorization`: Bearer `jwt_token`
- Request Body:
    ```json
    {
        "recipeId": 1,
        "userId": 1
    }
    ```
- Response:
    ```json
    {
        "message": "Favourite recipe removed successfully"
    }
    ```

### Perfil do Usuário

#### GET `/api/user/info`
Obtém as informações do perfil do usuário autenticado.
- Headers:
    - `Authorization`: Bearer `jwt_token`
- Response:
    ```json
    {
        "id": 1,
        "name": "Test Exemple",
        "email": "user@example.com",
    }
    ```

#### PUT `/api/user/update`
Atualiza as informações do perfil do usuário autenticado.
- Headers:
    - `Authorization`: Bearer `jwt_token`
- Request Body:
    ```json
    {
        "name": "Updated Name",
        "email": "updated_email@example.com"
    }
    ```
- Response:
    ```json
    {
        "id": 1,
        "name": "Updated Name",
        "email": "updated_email@example.com",
    }
    ```

## <span id="scripts">Scripts</span>

- `npm start`: Inicia o servidor de desenvolvimento com Nodemon.
- `npx prisma generate`: Gera o cliente Prisma.
- `npx prisma db push`: Aplica as migrações do Prisma ao banco de dados.
- `npm run test:integration`: Realiza os testes de integração com o Jest.
- `npm run test:unit`: Realiza os testes de unidade com o Jest.

<span id="estrutura-de-pastas">Estrutura de Pastas</span>

```
backend/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── prisma/
│   └── schema.prisma
├── jest.config.js
├── README-ptbr.md
├── README.md
├── src/
│   ├── controllers/
│   │   ├── recipeController.ts
│   │   └── userController.ts
│   ├── index.ts
│   ├── middlewares/
│   │   ├── rateLimiter.ts
│   │   └── validateRequest.ts
│   ├── routes/
│   │   └── routes.ts
│   ├── service/
│   |    ├── GetFavouriteRecipesByIdsService.ts
│   |    ├── GetRecipeSummaryService.ts
│   |    └── SearchRecipeService.ts
|   ├── validations/
|   |    ├── recipeValidations.ts
|   |    └── userValidation.ts
├── tsconfig.json
└── tests/
     ├── recipeController.integration.ts
     └── userController.integration.ts
```