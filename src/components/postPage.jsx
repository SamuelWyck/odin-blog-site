import "../styles/postPage.css";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import CommentForm from "./commentForm.jsx";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiManager from "../utils/apiManager.js";
import readableDate from "../utils/readableDate.js";



function PostPage() {
    const {postId} = useParams();
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    
    useEffect(function() {
        apiManager.getPost(postId).then(function(res) {
            setUser(res.user);
            if (res.post) {
                setPost({
                    title: res.post.title,
                    text: res.post.text,
                    date: res.post.createdAt,
                    author: res.post.author.username,
                    replies: res.post.comments.length
                });
                setComments(res.post.comments);
            }
        });
    }, [postId]);



    if (!post) {
        return (
        <>
        <Header user={user} />
        <p></p>
        <Footer />
        </>
        );
    }

    return (
    <>
    <Header user={user} />
    <div className="full-post">
        <div className="post-shadow">
        <div className="post">
            <p className="full-post-title">{post.title}</p>
            <p className="full-post-info">
                <p className="author">@{post.author}</p>
                <p className="full-post-date">{readableDate(post.date)}</p>
                <p>Comments ({post.replies})</p>
            </p>
            <p className="full-post-text">
                {post.text}
            </p>
        </div>
        </div>
        <p className="comments-title">Comments</p>
        <div className="comments"></div>
        {(!user) ? 
            <Link to="/login" className="comment-login">Log in to leave a comment</Link> :
            <CommentForm />
        }
    </div>
    <Footer />
    </>
    );
};



export default PostPage;