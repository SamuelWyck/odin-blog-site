import "../styles/adminPage.css";
import { useState, useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import apiManager from "../utils/apiManager.js";
import PostCard from "./postCard.jsx";
import PaginationButtons from "./paginationButtons.jsx";



function AdminPage() {
    const navigate = useNavigate();
    const {headerRef} = useOutletContext();
    const [posts, setPosts] = useState([]);
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

            const posts = [];
            for (let post of res.posts) {
                posts.push(
                    <PostCard 
                        post={post} 
                        key={post.id} 
                        admin={true} 
                    />
                );
            }

            headerRef.current.updateUser(res.user);
            setPosts(posts);
            if (res.posts.length === apiManager.postPageLength) {
                setMoreBtn(true);
            } else {
                setMoreBtn(false);
            }
        });
    }, [headerRef, navigate, pageNumber]);


    function changePageNumber(change) {
        setPageNumber(p => p + change);
    };


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
            />
        </main>
    );
};



export default AdminPage;