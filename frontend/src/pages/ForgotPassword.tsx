// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/ForgotPassword.module.css";
import NavBar from "../components/NavBar";
import { RequestPasswordResetService } from "../service/RequestPasswordService";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
}

function ForgotPassword() {
    // const [email, setEmail] = useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        // e.preventDefault();
        try {
            await RequestPasswordResetService(data);
            // await RequestPasswordResetService({ email });
            alert(`Password reset email sent to: ${data.email}`);
            // alert(`Password reset email sent to: ${email}`);
            navigate('/signin');
        } catch (error) {
            alert(`Password reset failed: ${error}`);
        }
    };

    return (
        <>
            <NavBar isLogged={false} />
            <div className={styles.bodyForgotPassword}>
                <div className={styles.forgotPasswordContainer}>
                    <h2>🥐 Forgot Password 🥐</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelForgotPassword}>Email:</label>
                            <input
                                type="email"
                                // value={email}
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                className={styles.inputForgotPassword}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
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