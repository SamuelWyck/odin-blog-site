import { useEffect, useState } from "react";
import api from "../utils/apiManager.js";
import Header from "./header.jsx";



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
        <Header user={user} />
        <PostsList posts={posts} />
        </>
    );
};



export default HomePage;