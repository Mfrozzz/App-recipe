import  styles from "../pages/css/RecipesPage.module.css";

function EmptyRecipeTab(){
    return (
        <div className={styles.emptyCard}>
            <p>🍽️ Recipe not Found. 🍽️</p>
        </div>
    );
}

export default EmptyRecipeTab;