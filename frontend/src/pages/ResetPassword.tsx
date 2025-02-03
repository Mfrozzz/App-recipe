import { useState } from "react";
import { useParams } from "react-router-dom";
import { ResetPasswordService } from "../service/ResetPasswordService";
import styles from "./css/ForgotPassword.module.css";
import NavBar from "../components/NavBar";

function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            alert("Invalid token");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await ResetPasswordService({ token, newPassword });
            alert("Password reset successfully");
        } catch (error) {
            alert("Failed to reset password");
        }
    }

    return (
        <>
            <NavBar />
            <div className={styles.bodyForgotPassword}>
                <div className={styles.forgotPasswordContainer}>
                    <h2>🥐 Reset Password 🥐</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelForgotPassword}>New Password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                className={styles.inputForgotPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelForgotPassword}>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                className={styles.inputForgotPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.forgotPasswordBtn}>Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;