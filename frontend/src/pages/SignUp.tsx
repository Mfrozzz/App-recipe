import { useState } from "react";
import { SignupService } from "../service/SignupUserService";
import styles from "../pages/css/SignUp.module.css";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await SignupService({ email, password, name });
            alert('Signup successful');
        } catch (error) {
            alert(`Signup failed: ${error}`);
        }
    };

    return (
        <>
            <NavBar />
            <body className={styles.bodySignUp}>
                <div className={styles.signupContainer}>
                    <h2>🥐 Register 🥐</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelSignUp}>Name:</label>
                            <input
                                type="text"
                                value={name}
                                className={styles.inputSignUp}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelSignUp}>Email:</label>
                            <input
                                type="email"
                                value={email}
                                className={styles.inputSignUp}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelSignUp}>Password:</label>
                            <input
                                type="password"
                                value={password}
                                className={styles.inputSignUp}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.signupBtn}>Register</button>
                        <label className={styles.labelSignUp}>Already registered? <Link to="/signin" className={styles.linkColor}>Click Here.</Link></label>
                    </form>
                </div>
            </body>
        </>
    );
};

export default SignUp;