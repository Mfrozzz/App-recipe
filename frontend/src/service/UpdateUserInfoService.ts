import User from "../model/User";

const UpdateUserInfoService = async (token: string, data: User) => {
    const urlBase = new URL("http://localhost:5000/api/recipe/user/info");

    const res = await fetch(urlBase, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        "body": JSON.stringify(data)
    });

    if(!res.ok){
        throw new Error("Failed to update user information");
    }
    return res.json();
}

export { UpdateUserInfoService };