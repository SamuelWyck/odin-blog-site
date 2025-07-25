import "../styles/headerNav.css";
import arrowImg from "../assets/chevron-down.svg";
import { useState } from "react";
import storage from "../utils/storageManager";
import { Link } from "react-router-dom";




function HeaderNav({user}) {
    const [rotateImg, setRotateImg] = useState(false);
    const [hideMenu, setHideMenu] = useState(true);

    
    document.addEventListener("click", function(event) {
        if (event.target.matches(".user-menu")) {
            return;
        }
        setRotateImg(false);
        setHideMenu(true);
    });

    function handleMenu(event) {
        event.stopPropagation();
        setRotateImg(!rotateImg);
        setHideMenu(!hideMenu);
    };


    function handleLogout(event) {
        event.stopPropagation();
        storage.clearCookie();
    };


    let navChlidren = null;
    if (!user) {
        navChlidren = <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
        </>
    } else {
        navChlidren = <>
            {!user.isAdmin || <Link to="/admin/posts">Write</Link>}
            <button onClick={handleMenu} className="user-menu-btn">
                <span className="username-span">{user.username}</span>
                <img 
                    className={
                        `menu-arrow ${(rotateImg) ? "rotate" : ""}`
                    } 
                    src={arrowImg} alt="arrow" 
                />
            </button>
            <div className={`user-menu${(hideMenu) ? " hidden" : ""}`}>
                <Link reloadDocument to="/posts" onClick={handleLogout}>Log out</Link>
            </div>
        </>
    }

    return (
        <nav className={(user) ? "user-nav" : "no-user-nav"}>
            {navChlidren}
        </nav>
    );
};



export default HeaderNav;