import User from "../model/User";

const SignInService = async (data: User) => {
    const urlBase = new URL("http://localhost:5000/api/recipe/login");

    const res = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to log in");
    }

    return res.json();
}

export { SignInService };