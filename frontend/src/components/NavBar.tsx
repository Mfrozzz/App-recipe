import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { FaCaretDown, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../pages/css/RecipesPage.module.css";
import { useState } from "react";
import { FaAddressBook, FaArrowRightFromBracket, FaCircleUser } from "react-icons/fa6";

interface Props{
    isLogged: boolean;
    userName?: string;
}

function NavBar({isLogged, userName}: Props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // userName = userName ? userName : "";
    userName = "User";
    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    return (
        <div>
            <nav>
                <div className={styles.leftNav}>
                    <Link to="/">
                        Tasty🥐Pick
                    </Link>
                </div>
                <div className={styles.rightNav}>
                    {
                        !isLogged ? (
                            <>
                                <span className={styles.btnsRight}><FaSignInAlt /> <Link to="/signin">Sign in</Link></span>
                                <span className={styles.btnsRight}><BsBoxArrowInDownLeft /> <Link to="/signup">Sign up</Link></span>
                            </>
                        ) : (
                            <div className={styles.dropdown}>
                                <span className={styles.btnsRight} onClick={toggleDropdown}>
                                <FaCircleUser /> {userName} <FaCaretDown />
                                </span>
                                {dropdownOpen && (
                                    <div className={styles.dropdownContent}>
                                        <Link to="/profile"><FaAddressBook />  Profile</Link>
                                        <a onClick={logout}><FaArrowRightFromBracket />  Logout</a>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}

export default NavBar;