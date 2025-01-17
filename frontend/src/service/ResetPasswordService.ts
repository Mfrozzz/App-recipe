interface ResetPasswordData {
    token: string;
    newPassword: string;
}

const ResetPasswordService = async (data: ResetPasswordData) => {
    const urlBase = new URL("http://localhost:5000/api/recipe/resetPassword");

    const res = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to reset password");
    }

    return res.json();
}

export { ResetPasswordService };