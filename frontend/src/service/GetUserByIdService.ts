const GetUserByIdService = async (userId: number) => {

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }
    
    const urlBase = new URL(`http://localhost:5000/api/recipe/user/info/${userId}`);
    const res = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(!res.ok) {
        throw new Error("Failed to get user info");
    }

    return res.json();
}

export { GetUserByIdService };