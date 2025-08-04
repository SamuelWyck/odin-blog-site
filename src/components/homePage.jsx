import "../styles/homePage.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../utils/apiManager.js";
import PostCard from "./postCard.jsx";
import apiManager from "../utils/apiManager.js";
import PaginationButtons from "./paginationButtons.jsx";



function HomePage() {
    const [pageNumber, setPageNumber] = useState(0);
    const [moreBtn, setMoreBtn] = useState(false);
    const [posts, setPosts] = useState(null);
    const {headerRef} = useOutletContext();

    useEffect(function() {
        api.getPosts(pageNumber).then(function(res) {
            if (res.errors) {
                return;
            }

            let moreBtnStatus = false;
            const numberPosts = res.posts.length;
            if (numberPosts === apiManager.postPageLength) {
                res.posts.pop();
                moreBtnStatus = true;
            }

            headerRef.current.updateUser(res.user);
            setPosts(getPostCards(res.posts));
            setMoreBtn(moreBtnStatus);
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
    };



    if (!posts) {
        return (
            <div className="loading-wrapper">
                <p className="loading">Loading...</p>
            </div>
        );
    }

    return (
    <div className="homepage">
        <div className="posts-wrapper">
            <div className="posts-list">
                {posts}
            </div>
        </div>
        <PaginationButtons
            handleClick={changePageNumber}
            moreBtn={moreBtn}
            pageNumber={pageNumber}
            comments={false}
        />
    </div>
    );
};



export default HomePage;