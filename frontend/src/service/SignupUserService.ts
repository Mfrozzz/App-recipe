import User from "../model/User";

const SignupService = async (data: User) => {
    const urlBase = new URL("http://localhost:5000/api/recipe/signup");

    const res = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to sign up");
    }

    return res.json();
}

export { SignupService };