import "../styles/adminPage.css";
import { useState, useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import apiManager from "../utils/apiManager.js";
import PostCard from "./postCard.jsx";



function AdminPage() {
    const navigate = useNavigate();
    const {headerRef} = useOutletContext();
    const [posts, setPosts] = useState([]);
    
    
    useEffect(function() {
        apiManager.getAuthoredPosts().then(function(res) {
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
        });
    }, [headerRef, navigate]);


    return (
        <main className="admin-main">
            <Link 
                className="new-post-link" 
                to="/admin/posts/new"
            >New Post</Link>
            <div className="admin-posts">
                {posts}
            </div>
        </main>
    );
};



export default AdminPage;