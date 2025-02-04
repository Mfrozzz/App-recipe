# Front-end

Este é o front-end do aplicativo Tasty🥐Pick, desenvolvido em React com TypeScript e Vite.

## Sumário 📄
* [Requisitos](#requisitos)
* [Configurando Ambiente](#configurando-ambiente)
* [Scripts](#scripts)
* [Estrutura de Pastas](#estrutura-de-pastas)
* [Versão EN-US](https://github.com/Mfrozzz/App-recipe/blob/master/frontend/README.md)

## <span id="requisitos">Requisitos</span>

- Node.js
- NPM ou Yarn

## <span id="configurando-ambiente">Configurando Ambiente</span>

1. Clone o repositório:
    ```shell
    git clone https://github.com/Mfrozzz/App-recipe.git
    cd frontend
    ```

2. Instale as dependências:
    ```shell
    npm install
    # ou
    yarn install
    ```

3. Inicie o servidor de desenvolvimento:
    ```shell
    npm run dev
    # ou
    yarn dev
    ```

4. Abra o navegador e acesse:
    ```
    http://localhost:5173
    ```

## <span id="scripts">Scripts</span>

- `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento.
- `npm run build` ou `yarn build`: Compila o projeto para produção.
- `npm run lint` ou `yarn lint`: Executa o linter para verificar problemas no código.
- `npm run preview` ou `yarn preview`: Visualiza a versão de produção do projeto.

## <span id="estrutura-de-pastas">Estrutura de Pastas</span>
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