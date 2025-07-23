import "../styles/authPage.css";
import snakeImg from "../assets/snake.png";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import storage from "../utils/storageManager";
import apiManager from "../utils/apiManager";
import ErrorsPartial from "./errorsPartial";



function AuthPage({signup}) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    
    if (storage.cookieExists()) {
        return <Navigate to="/" replace />;
    }


    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let reqBody = {};
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            reqBody[key] = value;
        }
        reqBody = JSON.stringify(reqBody);


        const res = await apiManager.authPost(reqBody, signup);
        console.log(res)
        if (res.errors) {
            setErrors(res.errors);
            return;
        }

        storage.storeCookie(res.token);
        navigate("/");
    };


    function clearErrors() {
        setErrors(null);
    };


    return (
    <>
    <p></p>
    <div className="auth-modal">
    <img src={snakeImg} alt="snake" />
    <p className="auth-title">Viper Blog</p>
    <ErrorsPartial errors={errors}/>
    <form onSubmit={handleSubmit} className="auth-form">
        {!signup || 
        <>
        <div>
            <label htmlFor="firstname">First name</label>
            <input type="text" name="firstname" id="firstname" required/>
        </div>
        <div>
            <label htmlFor="lastname">Last name</label>
            <input type="text" name="lastname" id="lastname" required/>
        </div>
        </>
        }
        <div>
            <label htmlFor="username">Username</label>
            <input key={signup} type="text" name="username" id="username"/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input key={signup} type="password" name="password" id="password" required/>
        </div>
        {!signup ||
        <div>
            <label htmlFor="confirm">Confirm</label>
            <input type="password" name="confirm" id="confirm"/>
        </div>
        }
        <div>
            <button>{(signup) ? "Sign Up" : "Log In"}</button>
        </div>
    </form>
    {(signup) ? 
        <Link onClick={clearErrors} to="/login">Already have an account?</Link>
        : 
        <Link onClick={clearErrors} to="/signup">Dont have an account?</Link>
    }
    </div>
    </>
    );
};



export default AuthPage;