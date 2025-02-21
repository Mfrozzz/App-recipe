const GetUserInfoService = async () => {

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }
    
    const urlBase = new URL("http://localhost:5000/api/recipe/userInfo");
    const res = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(!res.ok) {
        throw new Error("Failed to get user info");
    }

    return res.json();
}

export { GetUserInfoService };