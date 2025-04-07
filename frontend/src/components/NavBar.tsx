import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { FaCaretDown, FaMoon, FaSignInAlt, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "../pages/css/RecipesPage.module.css";
import { useState } from "react";
import { FaAddressBook, FaArrowRightFromBracket, FaCircleUser } from "react-icons/fa6";
import { useTheme } from "../theme/ThemeContext";

interface Props{
    isLogged: boolean;
    userName?: string;
}

function NavBar({isLogged, userName}: Props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const logout = () => {
        localStorage.removeItem("token");
        isLogged = false;
        navigate("/");
    };
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    return (
        <div>
            <nav>
                <div className={styles.leftNav}>
                    <Link to={ isLogged ? "/recipes" : "/" }>
                        Tasty🥐Pick
                    </Link>
                </div>
                <div className={styles.rightNav}>
                    <div className="toggleDiv">
                        <button onClick={toggleTheme} className={styles.themeSwitch}>
                            {theme === "light" ? <FaMoon /> : <FaSun />} 
                        </button>
                    </div>
                    {!isLogged ? (
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