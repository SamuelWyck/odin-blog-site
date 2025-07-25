import "../styles/homePage.css";
import { useEffect, useState } from "react";
import api from "../utils/apiManager.js";
import Header from "./header.jsx";
import PostCard from "./postCard.jsx";



function HomePage() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(function() {
        api.getPosts().then(function(res) {
            const postCards = getPostCards(res.posts);
            setUser(res.user);
            setPosts(postCards);
        });
    }, []);


    function getPostCards(posts) {
        const postCards = [];
        for (let post of posts) {
            postCards.push(<PostCard key={post.id} post={post}/>);
        }
        return postCards;
    };


    return (
        <>
        <Header user={user} />
        <div className="posts-wrapper">
        <div className="posts-list">
            {posts}
        </div>
        </div>
        </>
    );
};



export default HomePage;