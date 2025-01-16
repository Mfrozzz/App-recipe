import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../pages/css/RecipesPage.module.css";

function NavBar(){
    return (
        <div>
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
        </div>
    )
}

export default NavBar;