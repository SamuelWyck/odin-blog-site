import "../styles/homePage.css";
import { useEffect, useState } from "react";
import api from "../utils/apiManager.js";



function HomePage() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(function() {
        api.getPosts().then(function(res) {
            setUser(res.user);
            setPosts(res.posts);
        });
    }, []);


    return (
        <>
        <p>{console.log(user)}</p>
        <p>{posts.length}</p>
        </>
    );
};



export default HomePage;