import "../styles/authPage.css";
import snakeImg from "../assets/snake.png";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import storage from "../utils/storageManager";
import apiManager from "../utils/apiManager";
import ErrorsPartial from "./errorsPartial";



function AuthPage({signup}) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");


    useEffect(function() {
        apiManager.validCookie().then(function(valid) {
            if (valid) {
                navigate("/", {replace: true});
            }
        });
    }, [navigate])


    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let reqBody = {};
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            reqBody[key] = value;
        }
        reqBody = JSON.stringify(reqBody);


        const res = await apiManager.authenticateUser(
            reqBody, 
            signup
        );
        console.log(res)
        if (res.errors) {
            setErrors(res.errors);
            setPwd("");
            setConfirmPwd("");
            return;
        }

        storage.storeCookie(res.token);
        navigate("/");
    };


    function cleanForm() {
        setErrors(null);
        setPwd("");
        setConfirmPwd("");
    };


    function handleInput(event) {
        if (event.target.matches("#password")) {
            setPwd(event.target.value);
        } else {
            setConfirmPwd(event.target.value);
        }
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
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required/>
        </div>
        </>
        }
        <div>
            <label htmlFor="username">Username</label>
            <input key={signup} type="text" name="username" id="username"/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input value={pwd} onChange={handleInput} type="password" name="password" id="password" required/>
        </div>
        {!signup ||
        <div>
            <label htmlFor="confirm">Confirm</label>
            <input value={confirmPwd} onChange={handleInput} type="password" name="confirm" id="confirm"/>
        </div>
        }
        <div>
            <button>{(signup) ? "Sign Up" : "Log In"}</button>
        </div>
    </form>
    {(signup) ? 
        <Link onClick={cleanForm} to="/login">Already have an account?</Link>
        : 
        <Link onClick={cleanForm} to="/signup">Dont have an account?</Link>
    }
    </div>
    </>
    );
};



export default AuthPage;