import "../styles/header.css";
import snakeImg from "../assets/snake.png";
import HeaderNav from "./headerNav.jsx";
import { Link } from "react-router-dom";



function Header({user}) {
    return (
    <header>
        <Link to="/posts">
        <div className="banner">
            <img 
                src={snakeImg} 
                alt="snake" 
                className="banner-img" 
            />
            <p className="banner-logo">Viper Blog</p>
        </div>
        </Link>
        <HeaderNav user={user} />
    </header>
    );
};



export default Header;