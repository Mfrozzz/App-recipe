// import { useState } from "react";
import { SignupService } from "../service/SignupUserService";
import styles from "../pages/css/SignUp.module.css";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
    password: string;
    name: string;
}

function SignUp() {
    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    // const [name, setName] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        // e.preventDefault();
        try {
            await SignupService(data);
            alert('Signup successful');
            navigate('/signin');
        } catch (error) {
            alert(`Signup failed: ${error}`);
        }
    };

    return (
        <>
            <NavBar isLogged={false} />
            <body className={styles.bodySignUp}>
                <div className={styles.signupContainer}>
                    <h2>🥐 Register 🥐</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelSignUp}>Name:</label>
                            <input
                                type="text"
                                // value={name}
                                {...register("name", { required: "Name is required" })}
                                className={styles.inputSignUp}
                                // onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {errors.name && <div className={styles.error}>{errors.name.message}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelSignUp}>Email:</label>
                            <input
                                type="email"
                                // value={email}
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                className={styles.inputSignUp}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelSignUp}>Password:</label>
                            <input
                                type="password"
                                // value={password}
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                className={styles.inputSignUp}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
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