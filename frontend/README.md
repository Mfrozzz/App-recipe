# Front-end

This is the front-end of the Tasty🥐Pick application, developed in React with TypeScript and Vite.

## Table of Contents 📄
* [Requirements](#requirements)
* [Setting Up the Environment](#setting-up-the-environment)
* [Scripts](#scripts)
* [Folder Structure](#folder-structure)
* [PT-BR version](https://github.com/Mfrozzz/App-recipe/blob/master/frontend/README-ptbr.md)

## <span id="requirements">Requirements</span>

- Node.js
- NPM or Yarn

## <span id="setting-up-the-environment">Setting Up the Environment</span>

1. Clone the repository:
    ```shell
    git clone https://github.com/Mfrozzz/App-recipe.git
    cd frontend
    ```

2. Install the dependencies:
    ```shell
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```shell
    npm run dev
    # or
    yarn dev
    ```

4. Open the browser and access:
    ```
    http://localhost:5173
    ```

## <span id="scripts">Scripts</span>

- `npm run dev` or `yarn dev`: Starts the development server.
- `npm run build` or `yarn build`: Compiles the project for production.
- `npm run lint` or `yarn lint`: Runs the linter to check for code issues.
- `npm run preview` or `yarn preview`: Previews the production build of the project.

## <span id="folder-structure">Folder Structure</span>
```
frontend/ 
├── .gitignore 
├── eslint.config.js 
├── index.html 
├── package.json 
├── public/ 
│ └── icon-croissant.svg 
├── README-ptbr.md 
├── README.md 
├── src/ 
│ ├── App.css 
│ ├── App.tsx 
│ ├── assets/ 
│ ├── components/ 
│ │ ├── EmptyFavouriteTab.tsx 
│ │ ├── EmptyRecipeTab.tsx 
│ │ ├── NavBar.tsx 
│ │ ├── RecipeCard.tsx 
│ │ └── RecipeModal.tsx 
│ ├── main.tsx 
│ ├── model/ 
│ │ ├── Recipe.ts 
│ │ ├── RecipeSummary.ts 
│ │ └── User.ts 
│ ├── pages/ 
│ │ ├── css/ 
│ │ │ ├── ForgotPassword.module.css 
│ │ │ ├── RecipesPage.module.css 
│ │ │ ├── SignIn.module.css 
│ │ │ └── SignUp.module.css 
│ │ ├── ForgotPassword.tsx 
│ │ ├── RecipesPage.tsx 
│ │ ├── SignIn.tsx 
│ │ └── SignUp.tsx 
│ ├── routes/ 
│ │ └── Routes.tsx 
│ ├── service/ 
│ │ ├── AddFavouriteRecipeService.ts 
│ │ ├── GetFavouriteRecipesService.ts 
│ │ ├── GetRecipeSummaryService.ts 
│ │ ├── RemoveFavouriteRecipeService.ts 
│ │ ├── RequestPasswordService.ts 
│ │ ├── ResetPasswordService.ts 
│ │ ├── SearchRecipesService.ts 
│ │ └── SignupUserService.ts 
│ ├── vite-env.d.ts 
├── tsconfig.app.json 
├── tsconfig.json 
├── tsconfig.node.json 
└── vite.config.ts
```