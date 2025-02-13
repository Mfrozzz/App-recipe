import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/ForgotPassword.module.css";
import NavBar from "../components/NavBar";
import { RequestPasswordResetService } from "../service/RequestPasswordService";

function ForgotPassword() {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await RequestPasswordResetService({ email });
            alert(`Password reset email sent to: ${email}`);
            navigate('/signin');
        } catch (error) {
            alert(`Password reset failed: ${error}`);
        }
    };

    return (
        <>
            <NavBar isLogged={false}/>
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