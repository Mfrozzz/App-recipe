// import { useState } from "react";
import { SignInService } from "../service/SigninUserService";
import styles from "../pages/css/SignIn.module.css";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
    password: string;
    // name: string;
}

function SignIn() {
    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    // register is a property that is used to register the input element to the form
    const navigate = useNavigate();
    let userToken: any = null;

    const onSubmit = async (data: FormData) => {
        // e.preventDefault();
        try {
            // userToken = await SignInService({ email, password });
            userToken = await SignInService(data);
            setToken();
            alert('Login successful');
            navigate('/');
        } catch (error) {
            alert(`Login failed: ${error}`);
        }
    };

    const setToken = () => {
        localStorage.setItem("token", userToken);
        // console.log(userToken);
    };

    return (
        <>
            <NavBar isLogged={false} />
            <body className={styles.bodySignIn}>
                <div className={styles.loginContainer}>
                    <h2>🥐 Login 🥐</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelLogin}>Email:</label>
                            <input
                                type="email"
                                // value={email}
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                className={styles.inputLogin}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelLogin}>Password:</label>
                            <input
                                type="password"
                                // value={password}
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                className={styles.inputLogin}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
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