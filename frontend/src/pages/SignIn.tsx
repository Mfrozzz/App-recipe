import { useState } from "react";
import { SignInService } from "../service/SigninUserService";
import styles from "../pages/css/SignIn.module.css";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await SignInService({ email, password });
            alert('Login successful');
            navigate('/');
        } catch (error) {
            alert(`Login failed: ${error}`);
        }
    };

    return (
        <>
            <NavBar />
            <body className={styles.bodySignIn}>
                <div className={styles.loginContainer}>
                    <h2>🥐 Login 🥐</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelLogin}>Email:</label>
                            <input
                                type="email"
                                value={email}
                                className={styles.inputLogin}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelLogin}>Password:</label>
                            <input
                                type="password"
                                value={password}
                                className={styles.inputLogin}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.loginBtn}>Login</button>
                        <label className={styles.labelLogin}>Forgot your password? <Link to="/forgotPassword" className={styles.linkColor}>Click Here.</Link></label>
                        <label className={styles.labelLogin}>Click <Link to="/signup" className={styles.linkColor}>Here </Link>to register.</label>
                    </form>
                </div>
            </body>
        </>
    );
};

export default SignIn;