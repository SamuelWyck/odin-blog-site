import "../styles/header.css";
import snakeImg from "../assets/snake.png";
import HeaderNav from "./headerNav.jsx";
import { Link } from "react-router-dom";
import { Component } from "react";



class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.updateUser = this.updateUser.bind(this);
    };


    updateUser(user) {
        if (!this.state.user && !user) {
            return;
        }
        if (this.state.user && user && this.state.user.id === user.id) {
            return;
        }

        this.setState(function(state) {
            return {...state, user: user};
        });
    };


    render() {
        return (
        <header>
            <Link to="/posts">
            <div className="banner">
                <img 
                    src={snakeImg} 
                    alt="snake" 
                    className="banner-img" 
                />
                <p className="banner-logo">Snake Pit</p>
            </div>
            </Link>
            <HeaderNav user={this.state.user} />
        </header>
        );
    };
};



export default Header;