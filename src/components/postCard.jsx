import "../styles/postCard.css";
import { Link } from "react-router-dom";
import readableDate from "../utils/readableDate";
import snakeImg from "../assets/snake.png";
import { useState } from "react";
import apiManager from "../utils/apiManager";



function PostCard({post, admin}) {
    const [published, setPublished] = useState(post.posted);


    async function handlePublish() {
        const formData = new FormData();
        for (let key of Object.keys(post)) {
            if (key === "posted" && !published) {
                formData.append("published", "true");
                continue;
            }
            formData.append(key, post[key]);
        }

        const res = await apiManager.editAuthoredPost(
            formData,
            post.id
        );

        if (res.errors) {
            return;
        }

        setPublished(!published);
    };


    function filterClicks(event) {
        if (event.target.matches(".publish-btn")) {
            event.preventDefault();
        }
    };


    return (
    <Link 
        className="post-link" 
        to={(admin) ?
            `/admin/posts/${post.id}` :
            `/posts/${post.id}`
        }
        onClick={filterClicks}
    >
    <article className="post-card">
        {
        !admin ||
        <button className="publish-btn" onClick={handlePublish}>
            {(published) ? "Unpublish" : "Publish"}
        </button>
        }
        {(post.imageUrl) ?
        <div 
            className={
                `post-thumbnail-wrapper${(admin) ? " admin" : ""}`
            }
        >
            <img 
                className="post-thumbnail"
                src={post.imageUrl} 
            /> 
        </div> : null
        }
        <img 
            className="post-img"
            src={snakeImg} 
            alt="snake" 
        />
        <div className={`post-info${(admin) ? " admin" : ""}`}>
            <p className="post-author">@{post.author.username}</p>
            <p className="post-date">{readableDate(post.createdAt)}</p>
        </div>
        <p className="post-title">{post.title}</p>
        <p className="post-preview">{post.preview}</p>
    </article>
    </Link>
    );
};



export default PostCard;