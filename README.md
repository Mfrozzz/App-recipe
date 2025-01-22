# App Recipe Tasty🥐Pick

Tasty Pick is an app that allows users to view recipes from a database, as well as save and highlight their favorite recipes.  
<br>  
This app is built with a separation of frontend and backend, where the frontend is developed using React (TypeScript template) and Vite, while the backend is developed in Node.js with TypeScript using libraries like CORS, Express, Prisma, and Nodemon.  
<br>  
## Table of Contents 📄  
* [Requirements](#requirements)  
* [Setting up the environment](#setting-up)  
* [Backend](#backend)  
* [Frontend](#frontend)  
* [More Information](#more-info)  
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