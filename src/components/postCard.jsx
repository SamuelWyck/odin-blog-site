import "../styles/postCard.css";
import { Link } from "react-router-dom";
import readableDate from "../utils/readableDate";
import snakeImg from "../assets/snake.png";
import { useState } from "react";
import apiManager from "../utils/apiManager";



function PostCard({post, admin}) {
    const [published, setPublished] = useState(post.posted);


    async function handlePublish() {
        let reqBody = {
            title: post.title,
            text: post.text
        };
        if (!published) {
            reqBody.published = "true";
        }
        reqBody = JSON.stringify(reqBody);

        const res = await apiManager.editAuthoredPost(
            reqBody,
            post.id
        );

        if (res.errors) {
            return;
        }

        setPublished(!published);
    };


    return (
    <Link 
        className="post-link" 
        to={`/${(admin) ? "admin" : ""}/posts/${post.id}`}
    >
    <article className="post-card">
        {
        !admin ||
        <button className="publish-btn" onClick={handlePublish}>
            {(published) ? "Unpublish" : "Publish"}
        </button>
        }
        <img src={snakeImg} alt="snake" className="post-img" />
        <div className="post-info">
            <p className="post-author">@{post.author.username}</p>
            <p className="post-date">{readableDate(post.createdAt)}</p>
        </div>
        <p className="post-title">{post.title}</p>
        <p className="post-preview">{post.text.slice(0, 100)}...</p>
    </article>
    </Link>
    );
};



export default PostCard;