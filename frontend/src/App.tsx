import React, { FormEvent, useState } from 'react'
import './App.css'
import { SearchRecipesService } from './service/SearchRecipesService';
import Recipe from './model/Recipe';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const recipes = await SearchRecipesService(searchTerm, 1);
      setRecipes(recipes.results);
    } catch (error) {
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
          <div key={recipe.id}>
            Recipe Image Location: {recipe.image}
            <br />
            Recipe Title: {recipe.title}
          </div>
        ))}
      </div>
    </>
  )
}

export default App