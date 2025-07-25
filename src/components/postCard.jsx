import "../styles/postCard.css";
import { Link } from "react-router-dom";
import readableDate from "../utils/readableDate";
import snakeImg from "../assets/snake.png";



function PostCard({post}) {
    return (
    <Link className="post-link" to={`/posts/${post.id}`}>
    <article className="post-card">
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