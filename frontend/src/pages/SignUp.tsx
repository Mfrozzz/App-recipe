import { useState } from "react";
import { SignupService } from "../service/SignupUserService";
import styles from "../pages/css/SignUp.module.css";
import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await SignupService({ email, password, name });
            console.log('Signup successful:', response);
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <>
            <nav>
                <div className={styles.leftNav}>
                    <Link to="/">
                        Tasty🥐Pick
                    </Link>
                </div>
                <div className={styles.rightNav}>
                    <span className={styles.btnsRight}><FaSignInAlt /> <Link to="/signin">Sign in</Link></span>
                    <span className={styles.btnsRight}><BsBoxArrowInDownLeft /> <Link to="/signup">Sign up</Link></span>
                </div>
            </nav>
            <body className={styles.bodySignUp}>
                <div className={styles.signupContainer}>
                    <h2>Register</h2>
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
                    </form>
                </div>
            </body>
        </>
    );
};

export default SignUp;