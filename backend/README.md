# Back-end

This is the back-end of the Tasty🥐Pick app, developed in Node.js with TypeScript, using Express and Prisma to manage the PostgreSQL database.

## Table of Contents 📄
* [Requirements](#requirements)
* [Setting Up the Environment](#setting-up-the-environment)
* [Endpoints](#endpoints)
* [Scripts](#scripts)
* [Folder Structure](#folder-structure)
* [PT-BR version](https://github.com/Mfrozzz/App-recipe/blob/master/backend/README-ptbr.md)

## <span id="requirements">Requirements</span>

- Node.js
- PostgreSQL
- API Key from [Spoonacular](https://spoonacular.com/food-api)

## <span id="setting-up-the-environment">Setting Up the Environment</span>

1. Clone the repository:
    ```shell
    git clone https://github.com/Mfrozzz/App-recipe.git
    cd backend
    ```

2. Install dependencies:
    ```shell
    npm install
    ```

3. Create a `.env` file at the root of the project and add the following environment variables:
    ```dotenv
    PORT=5000
    DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
    API_KEY=your_api_key
    SECRET_KEY="your_encryption_key"
    EMAIL_USER="email@mail.com"
    EMAIL_PASS="password"
    ```

4. Set up Prisma:
    ```shell
    npx prisma generate
    npx prisma db push
    ```

5. Start the server:
    ```shell
    npm start
    ```

## <span id="endpoints">Endpoints</span>

### Authentication

#### POST `/api/recipe/signup`
Registers a new user.
- Request Body:
    ```json
    {
        "email": "user@example.com",
        "password": "password123",
        "name": "Test Example"
    }
    ```
- Response:
    ```json
    {
        "id": 1,
        "email": "user@example.com",
        "name": "Test Example"
    }
    ```

#### POST `/api/recipe/login`
Authenticates a user and returns a JWT token.
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
Requests a password reset for a user.
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
Resets a user's password using a token.
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

### Recipes

#### GET `/api/recipe/search`
Searches for recipes based on a search term.
- Query Params:
    - `searchTerm`: The search term.
    - `page`: The page number.
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
Gets the summary of a specific recipe.
- Path Params:
    - `recipeId`: The recipe ID.
- Response:
    ```json
    {
        "id": 1,
        "title": "Recipe Title",
        "summary": "Recipe summary..."
    }
    ```

### Favourite Recipes

#### GET `/api/recipe/favourite`
Gets all the user's favourite recipes.
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
Adds a recipe to the user's favourites.
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
Removes a recipe from the user's favourites.
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

### User Profile

#### GET `/api/user/info`
Gets the authenticated user's profile information.
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
Updates the authenticated user's profile information.
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

- `npm start`: Starts the development server with Nodemon.
- `npx prisma generate`: Generates the Prisma client.
- `npx prisma db push`: Applies the Prisma migrations to the database.

## <span id="folder-structure">Folder Structure</span>

```
backend/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── prisma/
│   └── schema.prisma
├── README-ptbr.md
├── README.md
├── src/
│   ├── controllers/
│   │   ├── recipeController.ts
│   │   └── userController.ts
│   ├── index.ts
│   ├── routes/
│   │   └── routes.ts
│   └── service/
│       ├── GetFavouriteRecipesByIdsService.ts
│       ├── GetRecipeSummaryService.ts
│       ├── SearchRecipeService.ts
├── tsconfig.json
```