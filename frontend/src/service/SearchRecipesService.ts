const SearchRecipesService = async (searchTerm: string, page: number) => {
    const baseURL = new URL(`http://localhost:5000/api/recipe/search?searchTerm=${searchTerm}`);
    baseURL.searchParams.append("page", page.toString());

    const response = await fetch(baseURL.toString());

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

export { SearchRecipesService };