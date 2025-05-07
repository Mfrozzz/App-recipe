# Front-end

Este é o front-end do aplicativo Tasty🥐Pick, desenvolvido em React com TypeScript e Vite.

## Sumário 📄
* [Requisitos](#requisitos)
* [Configurando Ambiente](#configurando-ambiente)
* [Scripts](#scripts)
* [Páginas e Componentes](#paginas-e-componentes)
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

## <span id="paginas-e-componentes">Páginas e Componentes</span>

### Páginas
- **HomePage**: Página inicial com categorias populares de receitas (Burger, Cake, Cookies e Pasta) e busca rápida.
- **RecipesPage**: Página para buscar receitas, visualizar os resultados e gerenciar receitas favoritas.
- **UserProfile**: Página de perfil do usuário com duas abas:
  - **View Info**: Exibe as informações do usuário (nome, email, etc.).
  - **Update Info**: Permite atualizar as informações do perfil do usuário.
- **SignIn e SignUp**: Páginas para autenticação de usuários (login e registro).
- **ForgotPassword**: Página para solicitar a redefinição de senha.
- **ResetPassword**: Página para redefinir a senha do usuário.

### Componentes
- **NavBar**: Barra de navegação responsiva que exibe o nome do usuário logado e permite logout.
- **RecipeCard**: Componente para exibir informações de receitas, com suporte para adicionar ou remover favoritos.
- **RecipeCardOffline**: Componente para exibir receitas sem funcionalidade de favoritos.
- **RecipeModal**: Modal para exibir detalhes de uma receita específica.
- **EmptyFavouriteTab**: Exibido quando o usuário não possui receitas favoritas.
- **EmptyRecipeTab**: Exibido quando a busca por receitas não retorna resultados.
- **RecipeReviews**: Exibe os comentários e notas da receita.

## <span id="estrutura-de-pastas">Estrutura de Pastas</span>
```
frontend/ 
├── .gitignore 
├── eslint.config.js 
├── index.html 
├── package.json 
├── package-lock.json
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
│ │ ├── RecipeCardOffline.tsx 
│ │ ├── RecipeModal.tsx 
| | └── RecipeReviews.tsx
│ ├── main.tsx 
│ ├── model/ 
│ │ ├── Recipe.ts 
│ │ ├── RecipeSummary.ts 
| | ├── Review.ts
│ │ └── User.ts 
│ ├── pages/ 
│ │ ├── css/ 
│ │ │ ├── ForgotPassword.module.css 
│ │ │ ├── RecipesPage.module.css 
│ │ │ ├── UserProfile.module.css 
│ │ │ ├── SignIn.module.css 
│ │ │ └── SignUp.module.css 
│ │ ├── ForgotPassword.tsx 
│ │ ├── RecipesPage.tsx 
│ │ ├── HomePage.tsx 
│ │ ├── UserProfile.tsx 
│ │ ├── RecipesPage.tsx 
│ │ ├── SignIn.tsx 
│ │ └── SignUp.tsx 
│ ├── routes/ 
│ │ └── Routes.tsx 
│ ├── service/ 
│ │ ├── AddFavouriteRecipeService.ts 
| | ├── AddReviewService.ts
│ │ ├── GetFavouriteRecipesService.ts 
│ │ ├── GetRecipeSummaryService.ts 
| | ├── GetReviewsByRecipeService.ts
| | ├── GetUserByIdService.ts
│ │ ├── GetUserInfoService.ts 
│ │ ├── RemoveFavouriteRecipeService.ts 
│ │ ├── RequestPasswordService.ts 
│ │ ├── ResetPasswordService.ts 
│ │ ├── SearchRecipesService.ts 
│ │ ├── SigninUserService.ts 
│ │ ├── UpdateUserInfoService.ts 
│ │ └── SignupUserService.ts 
| ├── theme/
| | └── ThemeContext.tsx
│ └── vite-env.d.ts 
├── tsconfig.app.json 
├── tsconfig.json 
├── tsconfig.node.json 
└── vite.config.ts
```