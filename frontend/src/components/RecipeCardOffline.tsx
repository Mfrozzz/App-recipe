import Recipe from "../model/Recipe";
import  styles from "../pages/css/RecipesPage.module.css";

interface Props {
    recipe: Recipe;
    onClick: () => void;
}

function RecipeCardOffline({ recipe, onClick }: Props) {
    return (
        <div className={styles.recipeCard} onClick={onClick}>
            <img src={recipe.image} />
            <div className={styles.recipeCardTitle + "recipeCardTitle"}>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
}

export default RecipeCardOffline;