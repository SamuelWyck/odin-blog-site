import "../styles/adminPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiManager from "../utils/apiManager.js";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
import PostCard from "./postCard.jsx";



function AdminPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
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

            setUser(res.user);
            setPosts(posts);
        });
    }, []);


    return (
        <>
        <Header user={user} />
        <main className="admin-main">
            <div className="admin-posts">
                {posts}
            </div>
        </main>
        <Footer />
        </>
    );
};



export default AdminPage;