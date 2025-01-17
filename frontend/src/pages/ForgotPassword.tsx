import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/ForgotPassword.module.css";
import NavBar from "../components/NavBar";

function ForgotPassword() {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Chame o serviço de recuperação de senha aqui
            console.log('Password reset email sent to:', email);
        } catch (error) {
            console.error('Password reset failed:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.bodyForgotPassword}>
                <div className={styles.forgotPasswordContainer}>
                    <h2>🥐 Forgot Password 🥐</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelForgotPassword}>Email:</label>
                            <input
                                type="email"
                                value={email}
                                className={styles.inputForgotPassword}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.forgotPasswordBtn}>Send Reset Link</button>
                    </form>
                    <div className={styles.links}>
                        <Link to="/signin">Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;