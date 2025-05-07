# App Recipe Tasty🥐Pick

Tasty Pick is an app that allows users to view recipes from a database, as well as save and highlight their favorite recipes.  
<br>  
This app is built with a separation of frontend and backend, where the frontend is developed using React (TypeScript template) and Vite, while the backend is developed in Node.js with TypeScript using libraries like CORS, Express, Prisma, and Nodemon.  
<br>  
## Table of Contents 📄  

* [Requirements](#requirements);
* [Setting up the environment](#setting-up);
* [Backend](#backend);
* [Frontend](#frontend);
* [More Information](#more-info);
* [Folder Structure](#folder-structure);
* [Screenshots](#screenshots);
* [PT-BR version](https://github.com/Mfrozzz/App-recipe/blob/master/README-ptbr.md);

<br>  

## <span id="requirements">Requirements</span>

The app has some prerequisites for getting started, including:

* Git  
* Node.js  
* API key from [Spoonacular](https://spoonacular.com/food-api)  
* PostgreSQL database (local or cloud)

<br>

## <span id="setting-up">Setting up the Environment</span>

1. Clone the repository
```shell
    git clone https://github.com/Mfrozzz/App-recipe.git
```
2. Get the Spoonacular API to access the recipes
   * Register at [Spoonacular](https://spoonacular.com/food-api) by clicking "Start Now"
3. Install PostgreSQL in your environment or configure a cloud database, for example:
   * [PostgreSQL](https://www.postgresql.org/download/)
   * [ElephantSQL](https://www.elephantsql.com/)
   * [Aiven](https://aiven.io/)
   * [Tembo](https://tembo.io/)
   * Docker: If you prefer to use Docker, run the following command to create and start a PostgreSQL container:
    ```shell
        docker run --name postgresql -e POSTGRES_PASSWORD=password -d -p 5432:5432 user
    ```
    * --name: Sets the container name to "postgresql".
    * -e POSTGRES_PASSWORD=password: Sets the password for the "postgres" user.
    * -d: Runs the container in the background.
    * -p 5432:5432: Maps port 5432 of the container to port 5432 of the host.
4. Initialize the Node.js environment for both frontend and backend
    ```shell
        cd backend
        npm i
        cd ..
        cd frontend
        npm i
    ```
5. Create a `.env` file and add the backend port, database URL, and API key  
   * Example:
    ```dotenv
        PORT=5000
        DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
        API_KEY=your_api_key
        SECRET_KEY="your_secret_key"
        EMAIL_USER="email@mail.com"
        EMAIL_PASS="password"
    ```
6. Create the database in your chosen environment
    * Example:
    ```shell
        CREATE DATABASE database_name;
    ```
7. Set up Prisma
    ```shell
    npx prisma init
    npm prisma generate
    npx prisma db push
    ```

<br>

## <span id="backend">Backend</span>

For more information on the Backend [Click Here](https://github.com/Mfrozzz/App-recipe/tree/master/backend)

<br>

## <span id="frontend">Frontend</span>

For more information on the Frontend [Click Here](https://github.com/Mfrozzz/App-recipe/tree/master/frontend)

<br>

## <span id="more-info">More Information</span>

> Based on the project from [FreeCodeCamp🔥](https://www.freecodecamp.org/news/full-stack-project-create-a-recipe-app-using-react-node-js/)

## <span id="folder-structure">Folder Structure</span>

```
App-recipe/
├── backend/
|    └── Back-end Folder Structure
├── frontend/
|    └── Front-end Folder Structure
├── screenshots/
|    └── Screenshots Folder
├── .gitignore
├── README-ptbr.md
└── README.md
```

## <span id="screenshots">Screenshots</span>

Here are some screenshots of the system to illustrate its features:

1. **Home Page**  
   The home page displays popular recipe categories and allows easy navigation.  
   ![HomePage](./screenshots/HomePage.png)

2. **Recipes Page**  
   Allows users to search for recipes, view results, and manage favorite recipes.  
   ![RecipesPage](./screenshots/RecipesPage.png)

3. **Recipe Modal**  
   Displays the details of a specific recipe, such as ingredients and instructions.  
   - Modal offline.
   ![ModalCard](./screenshots/ModalCard.png)
   - Modal online.
   ![ModalCardOnline](./screenshots/ModalRecipeWithLogin.png)
   - Reviews.
   ![ModalReview](./screenshots/ReviewSection.png)

4. **Login Page**  
   Allows users to authenticate and access their favorite recipes.  
   ![LoginPage](./screenshots/LoginPage.png)

5. **Sign-Up Page**  
   Allows new users to create an account.  
   ![SignUpPage](./screenshots/SignUpPage.png)

6. **Forgot Password Page**  
   Allows users to request a password reset.  
   ![ForgotPasswordPage](./screenshots/ForgotPasswordPage.png)

7. **Reset Password Page**  
   Allows users to reset their passwords using a token.  
   ![ResetPasswordPage](./screenshots/ResetPasswordPage.png)

8. **Favorites Section**  
   Displays the user's favorite recipes.  
   ![FavouriteSection](./screenshots/FavouriteSection.png)

9. **User Profile Page**  
   - View user information.  
   ![UserProfilePage](./screenshots/UserProfilePage.png)  
   - Update user information.  
   ![UpdateUserInfo](./screenshots/UpdateUserPage.png)

10. **User Dropdown**  
    Dropdown menu to access settings and logout.  
    ![UserDropdown](./screenshots/UserDropdown.png)

11. **Feedback Components**  
    - **Success Toast**: Displays success messages.  
      ![SuccessToast](./screenshots/SuccessToast.png)  
    - **Error Toast**: Displays error messages.  
      ![ErrorToast](./screenshots/ErrorToast.png)

12. **Dark Mode**  
    The system interface in dark mode.  
    ![DarkMode](./screenshots/DarkMode.png)

13. **Loading Component**  
    Displays a spinner while data is being loaded.  
    ![LoadingComponent](./screenshots/LoadingComponent.png)

14. **Recipe Cards List**  
    Displays a list of recipes in card format.  
    ![RecipeCards](./screenshots/RecipeCards.png)

15. **Empty Favorites**  
    Displays a message when the user has no favorite recipes.  
    ![EmptyFavourite](./screenshots/EmptyFavourite.png)