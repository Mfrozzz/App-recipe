import { useState } from "react";
import { SignInService } from "../service/SigninUserService";
import styles from "../pages/css/SignIn.module.css";
import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await SignInService({ email, password });
            console.log('Login successful:', response);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            <nav>
                <div className={styles.leftNav}>
                    Tasty🥐Pick
                </div>
                <div className={styles.rightNav}>
                    {/* arrumar alinhamento icons */}
                    <span className={styles.btnsRight}><FaSignInAlt /> <Link to="/signin">Sign in</Link></span>
                    <span className={styles.btnsRight}><BsBoxArrowInDownLeft /> <Link to="/signup">Sign up</Link></span>
                </div>
            </nav>
            <body className={styles.bodySignIn}>
                <div className={styles.loginContainer}>
                    <h2>Login</h2>
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
                    </form>
                </div>
            </body>
        </>
    );
};

export default SignIn;