import { useEffect, useRef, useState } from 'react'
import '../App.css'
import styles from "./css/RecipesPage.module.css";
import { SearchRecipesService } from '../service/SearchRecipesService';
import Recipe from '../model/Recipe';
import RecipeModal from '../components/RecipeModal';
import NavBar from '../components/NavBar';
import EmptyRecipeTab from '../components/EmptyRecipeTab';
import RecipeCardOffline from '../components/RecipeCardOffline';

type Tabs = "burger" | "cookies" | "pasta" | "cake" ;

function HomePage() {
    const [searchTerm, setSearchTerm] = useState<string>("burger");
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
    const [selectedTab, setSelectedTab] = useState<Tabs>("burger");
    const pageNumber = useRef(1);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

    useEffect(() => {
        const originalSearch = async () => {

            try {
                const recipes = await SearchRecipesService(searchTerm, 1);
                setRecipes(recipes.results);
                setSearchPerformed(true);
                pageNumber.current = 1;
            } catch (error) {
                console.log(error);
            }
        }
        originalSearch();
    }, []);

    const handleSearchSubmit = async (searchTab: string) => {
    
            try {
                const recipes = await SearchRecipesService(searchTab, 1);
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

    return (
        <div className={styles.appContainer}>
            <NavBar isLogged={false}/>
            <div className={styles.header}>
                <img src="../public/hero-image.jpg" alt="Food Banner" />
                <div className={styles.title}>Tasty🥐Pick</div>
            </div>
            <div>
                <div className={styles.tabs}>
                    <h1>Examples: </h1>
                    <h1 className={selectedTab === 'burger' ? styles.tabActive : ''} onClick={() =>{
                        setSelectedTab("burger");
                        setSearchTerm("burger");
                        handleSearchSubmit("burger");
                    }}>Burger 🍔</h1>
                    <h1 className={selectedTab === 'cake' ? styles.tabActive : ''} onClick={() =>{
                        setSelectedTab("cake");
                        setSearchTerm("cake");
                        handleSearchSubmit("cake");
                    }}>Cake 🍰</h1>
                    <h1 className={selectedTab === 'cookies' ? styles.tabActive : ''} onClick={() =>{
                        setSelectedTab("cookies");
                        setSearchTerm("cookies");
                        handleSearchSubmit("cookies");
                    }}>Cookies 🍪</h1>
                    <h1 className={selectedTab === 'pasta' ? styles.tabActive : ''} onClick={() =>{
                        setSelectedTab("pasta");
                        setSearchTerm("pasta");
                        handleSearchSubmit("pasta");
                    }}>Pasta 🍝</h1>
                </div>
                <div>
                    <div className={styles.recipeGrid}>
                        {searchPerformed && recipes.length === 0 ? (
                            <EmptyRecipeTab />
                        ) : (
                            recipes.map((recipe: Recipe) => {
                                return (
                                    <RecipeCardOffline
                                        key={recipe.id}
                                        recipe={recipe}
                                        onClick={() => setSelectedRecipe(recipe)}
                                    />
                                );
                            })
                        )}
                    </div>
                    <button className={styles.viewMoreButton} onClick={handleViewMoreClick}>
                        View More
                    </button>
                </div>
                {selectedRecipe ?
                    <RecipeModal
                        recipeId={selectedRecipe.id.toString()}
                        onClose={() => setSelectedRecipe(undefined)} /> : null}
            </div>
        </div>
    );
}

export default HomePage