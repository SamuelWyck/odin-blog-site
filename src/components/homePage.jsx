import "../styles/homePage.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../utils/apiManager.js";
import PostCard from "./postCard.jsx";
import apiManager from "../utils/apiManager.js";



function HomePage() {
    const [pageNumber, setPageNumber] = useState(0);
    const [moreBtn, setMoreBtn] = useState(true);
    const [posts, setPosts] = useState([]);
    const {headerRef} = useOutletContext();

    useEffect(function() {
        api.getPosts(pageNumber).then(function(res) {
            if (res.errors) {
                return;
            }

            const postCards = getPostCards(res.posts);
            headerRef.current.updateUser(res.user);
            setPosts(postCards);
            if (res.posts.length == apiManager.postPageLength) {
                setMoreBtn(true);
            } else {
                setMoreBtn(false);
            }
        });
    }, [headerRef, pageNumber]);


    function getPostCards(posts) {
        const postCards = [];
        for (let post of posts) {
            postCards.push(
            <PostCard key={post.id} post={post} admin={false}/>
        );
        }
        return postCards;
    };


    function changePageNumber(change) {
        setPageNumber(p => p + change);
        window.scrollTo({top: 0, behavior: "smooth"});
    };


    return (
    <div className="posts-wrapper">
        <div className="posts-list">
            {posts}
        </div>
        <div className="pagination-btns">
            {(pageNumber > 0) ?
                <button onClick={() => changePageNumber(-1)}>
                    Prev Posts
                </button> :
                <p></p>
            }
            <p></p>
            {(moreBtn) ?
                <button onClick={() => changePageNumber(1)}>
                    More Posts
                </button> :
                <p></p>
            }
        </div>
    </div>
    );
};



export default HomePage;