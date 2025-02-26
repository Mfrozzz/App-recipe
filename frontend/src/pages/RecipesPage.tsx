import { FormEvent, useEffect, useRef, useState } from 'react'
import '../App.css'
import styles from "./css/RecipesPage.module.css";
import { SearchRecipesService } from '../service/SearchRecipesService';
import Recipe from '../model/Recipe';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { GetFavouriteRecipesService } from '../service/GetFavouriteRecipesService';
import { AddFavouriteRecipeService } from '../service/AddFavouriteRecipeService';
import { RemoveFavouriteRecipeService } from '../service/RemoveFavouriteRecipeService';
import { AiOutlineSearch } from 'react-icons/ai';
import EmptyFavouriteTab from '../components/EmptyFavouriteTab';
import NavBar from '../components/NavBar';
import EmptyRecipeTab from '../components/EmptyRecipeTab';
import User from '../model/User';
import { GetUserInfoService } from '../service/GetUserInfoService';
import { useNavigate } from 'react-router-dom';

type Tabs = "search" | "favourites";

function RecipesPage() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
    const [selectedTab, setSelectedTab] = useState<Tabs>("search");
    const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
    const pageNumber = useRef(1);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signin");
        }
        GetUserInfoService(token).then((data) => {
            setUser(data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        if(user){
            setIsLogged(true);
            fetchFavouriteRecipes();
        } else {
            setIsLogged(false);
        }
    },[user]);

    const fetchFavouriteRecipes = async () => {
        try {
            const favouriteRecipes = await GetFavouriteRecipesService(user.id);
            setFavouriteRecipes(favouriteRecipes.results);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const recipes = await SearchRecipesService(searchTerm, 1);
            setRecipes(recipes.results);
            setSearchPerformed(true);
            pageNumber.current = 1;
        } catch (error) {
            console.log(error);
        }
    }

    const handleViewMoreClick = async () => {
        const nextPage = pageNumber.current + 1;
        try {
            const nextRecipes = await SearchRecipesService(searchTerm, nextPage);
            setRecipes([...recipes, ...nextRecipes.results]);
            pageNumber.current = nextPage;
        } catch (error) {
            console.log(error);
        }
    }

    const addFavoriteRecipe = async (recipe: Recipe, user: User) => {
        try {
            await AddFavouriteRecipeService(recipe, user);
            setFavouriteRecipes([...favouriteRecipes, recipe]);
        } catch (error) {
            console.log(error);
        }
    };

    const removeFavouriteRecipe = async (recipe: Recipe, user: User) => {
        try {
            await RemoveFavouriteRecipeService(recipe, user);
            const updatedRecipes = favouriteRecipes.filter(
                (favoriteRecipe) => recipe.id !== favoriteRecipe.id
            );
            setFavouriteRecipes(updatedRecipes);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.appContainer}>
            <NavBar isLogged={isLogged} userName={user?.name}/>
            <div className={styles.header}>
                <img src="../public/hero-image.jpg" alt="Food Banner" />
                <div className={styles.title}>Tasty🥐Pick</div>
            </div>
            <div>
                <div className={styles.tabs}>
                    <h1 className={selectedTab === 'search' ? styles.tabActive : ''} onClick={() => setSelectedTab("search")}>Recipe Search 🤔</h1>
                    <h1 className={selectedTab === 'favourites' ? styles.tabActive : ''} onClick={() => setSelectedTab("favourites")}>Favourites 😍</h1>
                </div>
                {selectedTab === "search" && (<>
                    <form onSubmit={(event) => handleSearchSubmit(event)}>
                        <input
                            type="text"
                            required
                            placeholder='Enter a search Term...'
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            title='Enter a recipe name or category.'
                        ></input>
                        <button type="submit"><AiOutlineSearch className={styles.searchBtn} size={40} /></button>
                    </form>
                    <div className={styles.recipeGrid}>
                        {/* Add a component when the search returns 0 results */}
                        {searchPerformed && recipes.length === 0 ? (
                            <EmptyRecipeTab />
                        ) : (
                            recipes.map((recipe: Recipe) => {
                                const isFavorite = favouriteRecipes.some(
                                    (favoriteRecipe) => recipe.id === favoriteRecipe.id
                                );
                                return (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        user={user}
                                        onClick={() => setSelectedRecipe(recipe)}
                                        onFavouriteButtonClick={isFavorite ? removeFavouriteRecipe : addFavoriteRecipe}
                                        isFavorite={isFavorite}
                                    />
                                );
                            })
                        )}
                    </div>
                    <button className={styles.viewMoreButton} onClick={handleViewMoreClick}>
                        View More
                    </button>
                </>)}
                {selectedTab === "favourites" && (<>
                    <div className={styles.recipeGrid}>
                        {favouriteRecipes.length > 0 ? (
                            favouriteRecipes.map((recipe) =>
                                <RecipeCard
                                    recipe={recipe}
                                    user={user}
                                    onClick={() => setSelectedRecipe(recipe)}
                                    onFavouriteButtonClick={removeFavouriteRecipe}
                                    isFavorite={true}
                                />
                            )
                        ) : (
                            <EmptyFavouriteTab />
                        )
                        }
                    </div>
                </>)}
                {selectedRecipe ?
                    <RecipeModal
                        recipeId={selectedRecipe.id.toString()}
                        onClose={() => setSelectedRecipe(undefined)} /> : null}
            </div>
        </div>
    );
}

export default RecipesPage