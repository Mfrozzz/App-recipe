import  styles from "../pages/css/RecipesPage.module.css";

function EmptyFavouriteTab(){
    return (
        <div className={`${styles.emptyCard} ${styles.emptyFavourite}`}>
            <p>🍽️ Add some favourite Recipes to see them here! 🍽️</p>
        </div>
    );
}

export default EmptyFavouriteTab;