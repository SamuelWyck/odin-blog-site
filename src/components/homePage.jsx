import "../styles/homePage.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../utils/apiManager.js";
import PostCard from "./postCard.jsx";



function HomePage() {
    const [posts, setPosts] = useState([]);
    const {headerRef} = useOutletContext();

    useEffect(function() {
        api.getPosts().then(function(res) {
            if (res.errors) {
                return;
            }

            const postCards = getPostCards(res.posts);
            headerRef.current.updateUser(res.user);
            setPosts(postCards);
        });
    }, [headerRef]);


    function getPostCards(posts) {
        const postCards = [];
        for (let post of posts) {
            postCards.push(
            <PostCard key={post.id} post={post} admin={false}/>
        );
        }
        return postCards;
    };


    return (
        <div className="posts-wrapper">
            <div className="posts-list">
                {posts}
            </div>
        </div>
    );
};



export default HomePage;