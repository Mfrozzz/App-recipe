// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordService } from "../service/ResetPasswordService";
import styles from "./css/ForgotPassword.module.css";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";

interface FormData {
    newPassword: string;
    confirmPassword: string;
}

function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        if (!token) {
            alert("Invalid token");
            return;
        }

        if (data.newPassword !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await ResetPasswordService({ token, newPassword: data.newPassword });
            alert("Password reset successfully");
            navigate("/signin");
        } catch (error) {
            alert("Failed to reset password");
        }
    }

    return (
        <>
            <NavBar isLogged={false} />
            <div className={styles.bodyForgotPassword}>
                <div className={styles.forgotPasswordContainer}>
                    <h2>🥐 Reset Password 🥐</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelForgotPassword}>New Password:</label>
                            <input
                                type="password"
                                {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                className={styles.inputForgotPassword}
                                required
                            />
                            {errors.newPassword && <div className={styles.error}>{errors.newPassword.message}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelForgotPassword}>Confirm Password:</label>
                            <input
                                type="password"
                                {...register("confirmPassword", { required: "Confirm password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                className={styles.inputForgotPassword}
                                required
                            />
                            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword.message}</div>}
                        </div>
                        <button type="submit" className={styles.forgotPasswordBtn}>Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;