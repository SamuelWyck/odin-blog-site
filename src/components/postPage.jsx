import "../styles/postPage.css";
import CommentForm from "./commentForm.jsx";
import CommentCard from "./commentCard.jsx";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import apiManager from "../utils/apiManager.js";
import readableDate from "../utils/readableDate.js";
import snakeImg from "../assets/snake.png";



function PostPage() {
    const {headerRef} = useOutletContext();
    const {postId} = useParams();
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    
    useEffect(function() {
        apiManager.getPost(postId).then(function(res) {
            if (res.errors || !res.post) {
                return;
            }

            headerRef.current.updateUser(res.user);
            setUser(res.user);

            setPost({
                title: res.post.title,
                text: res.post.text,
                date: res.post.createdAt,
                author: res.post.author.username,
                replies: res.post.comments.length
            });

            const commentCards = [];
            for (let comment of res.post.comments) {
                commentCards.push(
                    <CommentCard 
                        key={comment.id} 
                        user={res.user} 
                        comment={comment}
                        admin={false}
                    />
                );
            }
            setComments(commentCards);
        });
    }, [postId, headerRef]);


    function getCommentCards(comments) {
        const commentCards = [];
        for (let comment of comments) {
            commentCards.push(
                <CommentCard 
                    user={user} 
                    key={comment.id} 
                    comment={comment}
                    admin={false}
                />
            );
        }
        return commentCards;
    };


    async function handleCommentSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let reqBody = {
            postid: postId
        };
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            reqBody[key] = value;
        }

        if (!reqBody.text.trim()) {
            return;
        }
        reqBody = JSON.stringify(reqBody);

        const res = await apiManager.newComment(reqBody);

        if (res.errors) {
            console.log(res.errors);
            return;
        }

        event.target.reset();

        const newPost = await apiManager.getPost(postId);
        if (newPost.post) {
            setComments(getCommentCards(newPost.post.comments));
        }
    };



    if (!post) {
        return (
            <p></p>
        );
    }

    return (
    <div className="full-post">
        <div className="post-shadow">
        <div className="post">
            <p className="full-post-title">
                <img src={snakeImg} alt="snake" className="post-img" />
                {post.title}
            </p>
            <div className="full-post-info">
                <p className="author">@{post.author}</p>
                <p className="full-post-date">{readableDate(post.date)}</p>
                <p>Comments ({post.replies})</p>
            </div>
            <p 
                className="full-post-text" 
                dangerouslySetInnerHTML={{__html: post.text}}
            ></p>
        </div>
        </div>
        <p className="comments-title">Comments</p>
        {(!user) ? 
            <Link to="/login" className="comment-login">Log in to leave a comment</Link> :
            <CommentForm handleSubmit={handleCommentSubmit} />
        }
        <div className="comments">
            {comments}
        </div>
    </div>
    );
};



export default PostPage;