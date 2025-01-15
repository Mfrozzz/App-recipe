import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Recipe from "../model/Recipe";
import  styles from "../pages/css/RecipesPage.module.css";

interface Props {
    recipe: Recipe;
    onClick: () => void;
    onFavouriteButtonClick: (recipe: Recipe) => void;
    isFavorite: boolean;
}

function RecipeCard({ recipe, onClick, onFavouriteButtonClick, isFavorite }: Props) {
    return (
        <div className={styles.recipeCard} onClick={onClick}>
            <img src={recipe.image} />
            <div className={styles.recipeCardTitle}>
                <span onClick={(event) => {
                    event.stopPropagation()
                    onFavouriteButtonClick(recipe)
                }}>
                    {isFavorite ? (
                        <AiFillHeart size={25} color="red" />
                    ) : (
                        <AiOutlineHeart size={25} />
                    )}
                </span>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
}

export default RecipeCard;