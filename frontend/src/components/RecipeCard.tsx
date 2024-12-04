import { AiOutlineHeart } from "react-icons/ai";
import Recipe from "../model/Recipe";

interface Props{
    recipe: Recipe;
    onClick: ()=>void;
    onFavouriteButtonClick: (recipe:Recipe)=> void;
}

function RecipeCard({recipe, onClick, onFavouriteButtonClick}: Props){
    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image}/>
            <div className="recipe-card title">
                <span onClick={(event)=>{
                    event.stopPropagation()
                    onFavouriteButtonClick(recipe)
                }}>
                    <AiOutlineHeart size={25}/>
                </span>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
}

export default RecipeCard;