// import { useState } from "react";
import { SignupService } from "../service/SignupUserService";
import styles from "../pages/css/SignUp.module.css";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";

interface FormData {
    email: string;
    password: string;
    name: string;
}

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            await SignupService(data);
            toast.success('Signup successful!', { position: "bottom-right", autoClose: 3000 });
            navigate('/signin');
        } catch (error) {
            toast.error(`Signup failed: ${error}`, { position: "bottom-right", autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar isLogged={false} />
            <body className={styles.bodySignUp}>
                <div className={styles.signupContainer}>
                    <h2>🥐 Register 🥐</h2>
                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                            <p>Loading ...</p>
                        </div>
                    ):(
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                            <div className={styles.formGroup}>
                                <label className={styles.labelSignUp}>Name:</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className={styles.inputSignUp}
                                    required
                                />
                                {errors.name && <div className={styles.error}>{errors.name.message}</div>}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.labelSignUp}>Email:</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                    className={styles.inputSignUp}
                                    required
                                />
                                {errors.email && <div className={styles.error}>{errors.email.message}</div>}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.labelSignUp}>Password:</label>
                                <input
                                    type="password"
                                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                    className={styles.inputSignUp}
                                    required
                                />
                                {errors.password && <div className={styles.error}>{errors.password.message}</div>}
                            </div>
                            <button type="submit" className={styles.signupBtn}>Register</button>
                            <label className={styles.labelSignUp}>Already registered? <Link to="/signin" className={styles.linkColor}>Click Here.</Link></label>
                        </form>
                    )}
                </div>
            </body>
        </>
    );
};

export default SignUp;