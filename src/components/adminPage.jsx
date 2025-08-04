import "../styles/adminPage.css";
import { useState, useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import apiManager from "../utils/apiManager.js";
import PostCard from "./postCard.jsx";
import PaginationButtons from "./paginationButtons.jsx";



function AdminPage() {
    const navigate = useNavigate();
    const {headerRef} = useOutletContext();
    const [posts, setPosts] = useState(null);
    const [moreBtn, setMoreBtn] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    
    
    useEffect(function() {
        apiManager.getAuthoredPosts(pageNumber).then(function(res) {
            if (res.errors) {
                navigate("/");
                return;
            }
            if (!res.user || !res.user.isAdmin) {
                navigate("/");
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
    }, [headerRef, navigate, pageNumber]);


    function changePageNumber(change) {
        setPageNumber(p => p + change);
    };


    function getPostCards(posts) {
        const postCards = [];
        for (let post of posts) {
            postCards.push(
                <PostCard 
                    post={post} 
                    key={post.id} 
                    admin={true} 
                />
            );
        }
        return postCards;
    };



    if (!posts) {
        return (
            <div className="loading-wrapper">
                <p className="loading">Loading...</p>
            </div>
        );
    }

    return (
        <main className="admin-main">
            <Link 
                className="new-post-link" 
                to="/admin/posts/new"
            >New Post</Link>
            <div className="admin-posts">
                {posts}
            </div>
            <PaginationButtons
                handleClick={changePageNumber}
                moreBtn={moreBtn}
                pageNumber={pageNumber}
                comments={false}
            />
        </main>
    );
};



export default AdminPage;