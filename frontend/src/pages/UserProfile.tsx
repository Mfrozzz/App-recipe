import { useState, useEffect } from 'react';
import styles from "./css/UserProfile.module.css";
import { GetUserInfoService } from '../service/GetUserInfoService';
import { UpdateUserInfoService } from '../service/UpdateUserInfoService';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import User from '../model/User';
import { useForm } from 'react-hook-form';

type Tabs = "view" | "update";

interface FormData {
    name: string;
    email: string;
}

function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [selectedTab, setSelectedTab] = useState<Tabs>("view");
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        GetUserInfoService(token).then((data) => {
            setUser(data);
            setIsLogged(true);
            setValue("name", data.name);
            setValue("email", data.email);
        }).catch((err) => {
            console.log(err);
            setIsLogged(false);
        });
    }, [navigate, setValue]);

    const onSubmit = async (data: FormData) => {

        const token = localStorage.getItem("token");
        if (!token || !user) {
            return;
        }

        try {
            await UpdateUserInfoService(token, data);
            alert("User information updated successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Failed to update user information");
        }
    }

    return (
        <div className={styles.appContainer}>
            <NavBar isLogged={isLogged} userName={user?.name || ''} />
            <div className={styles.header}>
                <img src="../public/hero-image.jpg" alt="Food Banner" />
                <div className={styles.title}>User🥐Profile</div>
            </div>
            <div className={styles.tabs}>
                <h1 className={selectedTab === 'view' ? styles.tabActive : ''} onClick={() => setSelectedTab("view")}>View Info</h1>
                <h1 className={selectedTab === 'update' ? styles.tabActive : ''} onClick={() => setSelectedTab("update")}>Update Info</h1>
            </div>
            {selectedTab === "view" && (
                <div className={styles.infoContainer}>
                    <div className={styles.infoCard}>
                        <h2>User Information</h2>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Name:</span>
                            <span className={styles.infoValue}>{user?.name}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Email:</span>
                            <span className={styles.infoValue}>{user?.email}</span>
                        </div>
                    </div>
                </div>
            )}
            {selectedTab === "update" && (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label>Name:</label>
                        <input
                            type="text"
                            className={styles.inputProfile}
                            placeholder={user?.name}
                            {...register("name", { required: "Name is required" })}
                            required
                        />
                        {errors.name && <div className={styles.error}>{errors.name.message}</div>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            className={styles.inputProfile}
                            placeholder={user?.email}
                            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                            required
                        />
                        {errors.email && <div className={styles.error}>{errors.email.message}</div>}
                    </div>
                    <button type="submit" className={styles.updateBtn}>Update</button>
                </form>
            )}
        </div>
    );
}

export default UserProfile;