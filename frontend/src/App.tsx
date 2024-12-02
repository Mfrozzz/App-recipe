import React, { FormEvent, useRef, useState } from 'react'
import './App.css'
import { SearchRecipesService } from './service/SearchRecipesService';
import Recipe from './model/Recipe';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const recipes = await SearchRecipesService(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  }

  const handleViewMoreClick = async () =>{
    const nextPage = pageNumber.current + 1;
    try{
      const nextRecipes = await SearchRecipesService(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={(event) => handleSearchSubmit(event)}>
          <input 
            type="text" 
            required 
            placeholder='Enter a search Term...' 
            value={searchTerm}
            onChange={(event)=> setSearchTerm(event.target.value)}
            ></input>
          <button type="submit">Submit</button>
        </form>
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={()=> setSelectedRecipe(recipe)}/>
        ))}
        <button className="view-more-button" onClick={handleViewMoreClick}>
          View More
        </button>
        {selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={()=> setSelectedRecipe(undefined)}/> : null}
      </div>
    </>
  );
}

export default App