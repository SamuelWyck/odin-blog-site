import "../styles/header.css";
import snakeImg from "../assets/snake.png";
import HeaderNav from "./headerNav.jsx";



function Header({user}) {
    return (
    <header>
        <div className="banner">
            <img 
                src={snakeImg} 
                alt="snake" 
                className="banner-img" 
            />
            <p className="banner-logo">Viper Blog</p>
        </div>
        <HeaderNav user={user} />
    </header>
    );
};



export default Header;