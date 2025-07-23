import "../styles/headerNav.css";
import arrowImg from "../assets/chevron-down.svg";
import { Link } from "react-router-dom";




function HeaderNav({user}) {

    let navChlidren = null;
    if (!user) {
        navChlidren = <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
        </>
    } else {
        navChlidren = <>
            <Link to="/admin/posts">Write</Link>
            <button>
                {user.username}
                <img src={arrowImg} alt="arrow" />
            </button>
        </>
    }

    return (
        <nav className={(user) ? "user-nav" : "no-user-nav"}>
            {navChlidren}
        </nav>
    );
};



export default HeaderNav;