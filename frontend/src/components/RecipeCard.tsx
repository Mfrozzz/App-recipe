import Recipe from "../model/Recipe";

interface Props{
    recipe: Recipe;
    onClick: ()=>void;
}

function RecipeCard({recipe, onClick}: Props){
    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image}/>
            <div className="recipe-card title">
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
}

export default RecipeCard;