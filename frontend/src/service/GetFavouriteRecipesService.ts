const GetFavouriteRecipesService = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }

    const urlBase = new URL(`http://localhost:5000/api/recipe/favourite/${userId}`);
    const response = await fetch(urlBase,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP Error: Status: ${response.status}`);
    }
    return response.json();
}

export { GetFavouriteRecipesService };