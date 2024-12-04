import React, { FormEvent, useEffect, useRef, useState } from 'react'
import './App.css'
import { SearchRecipesService } from './service/SearchRecipesService';
import Recipe from './model/Recipe';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { GetFavouriteRecipesService } from './service/GetFavouriteRecipesService';
import { AddFavouriteRecipeService } from './service/AddFavouriteRecipeService';
import { RemoveFavouriteRecipeService } from './service/RemoveFavouriteRecipeService';


type Tabs = "search" | "favourites" ;

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab,setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(()=>{
    const fetchFavouriteRecipes = async ()=>{
      try{
        const favouriteRecipes = await GetFavouriteRecipesService();
        setFavouriteRecipes(favouriteRecipes.results);
      }catch(error){
        console.log(error);
      }
    }
    fetchFavouriteRecipes();
  },[]);

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

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await AddFavouriteRecipeService(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await RemoveFavouriteRecipeService(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favoriteRecipe)=> recipe.id !== favoriteRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
      <div className="tabs">
        <h1 onClick={()=> setSelectedTab("search")}>Recipe Search</h1>
        <h1 onClick={()=> setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {selectedTab === "search" && (<>
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
        {recipes.map((recipe: Recipe) => {
          const isFavorite = favouriteRecipes.some(
            (favoriteRecipe)=> recipe.id === favoriteRecipe.id
          );
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={isFavorite ? removeFavouriteRecipe : addFavoriteRecipe}
              isFavorite ={isFavorite}
            />
          );
        })}
        <button className="view-more-button" onClick={handleViewMoreClick}>
          View More
        </button>
      </>)}
      {selectedTab === "favourites" && (<>
        <div>
          {favouriteRecipes.map((recipe)=>
            <RecipeCard 
              recipe={recipe}
              onClick={()=> setSelectedRecipe(recipe)}
              onFavouriteButtonClick={removeFavouriteRecipe}
              isFavorite={true}
            />
          )}
        </div>
      </>)}
        {selectedRecipe ? 
          <RecipeModal 
          recipeId={selectedRecipe.id.toString()} 
          onClose={()=> setSelectedRecipe(undefined)}/> : null}
      </div>
    </>
  );
}

export default App