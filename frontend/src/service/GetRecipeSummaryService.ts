const getRecipeSummaryService = async (recipeId: string)=>{
    const urlBase = new URL(`http://localhost:5000/api/recipe/${recipeId}/summary`);
    const response = await fetch(urlBase.toString());
    if(!response.ok){
        throw new Error(`Http error! Status: ${response.status}`)
    }
    return response.json();
}

export { getRecipeSummaryService };