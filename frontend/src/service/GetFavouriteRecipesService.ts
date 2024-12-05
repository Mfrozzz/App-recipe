const GetFavouriteRecipesService = async () => {
    const urlBase = new URL("http://localhost:5000/api/recipe/favourite");
    const response = await fetch(urlBase);
    if (!response.ok) {
        throw new Error(`HTTP Error: Status: ${response.status}`);
    }
    return response.json();
}

export { GetFavouriteRecipesService };