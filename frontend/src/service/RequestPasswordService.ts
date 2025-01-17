interface RequestPasswordResetData {
    email: string;
}

const RequestPasswordResetService = async (data: RequestPasswordResetData) => {
    const urlBase = new URL("http://localhost:5000/api/recipe/requestPasswordReset");

    const res = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to request password reset");
    }

    return res.json();
}

export { RequestPasswordResetService };