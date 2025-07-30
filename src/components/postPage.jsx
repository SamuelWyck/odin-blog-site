import "../styles/postPage.css";
import CommentForm from "./commentForm.jsx";
import CommentCard from "./commentCard.jsx";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import apiManager from "../utils/apiManager.js";
import readableDate from "../utils/readableDate.js";
import snakeImg from "../assets/snake.png";
import PaginationButtons from "./paginationButtons.jsx";



function PostPage() {
    const {headerRef} = useOutletContext();
    const {postId} = useParams();
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [moreBtn, setMoreBtn] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    
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
                author: res.post.author.username
            });

            const moreBtnStatus = checkForMoreCmts(
                res.post.comments
            );
            setComments(
                getCommentCards(res.post.comments, res.user)
            );
            setMoreBtn(moreBtnStatus);
        });
    }, [postId, headerRef]);


    function getCommentCards(comments, user) {
        const commentCards = [];
        for (let comment of comments) {
            commentCards.push(
                <CommentCard 
                    user={user} 
                    key={comment.id} 
                    comment={comment}
                    admin={false}
                    updateComments={handleCommentDelete}
                />
            );
        }
        return commentCards;
    };


    function getReqBody(form) {
        const formData = new FormData(form);

        let reqBody = {
            postid: postId
        };
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            reqBody[key] = value;
        }

        if (!reqBody.text.trim()) {
            return null;
        }
        reqBody = JSON.stringify(reqBody);
        return reqBody;
    };


    function checkForMoreCmts(commentsList) {
        let moreBtnStatus = false;

        const numberComments = commentsList.length;
        if (numberComments === apiManager.cmtPageLength) {
            commentsList.pop();
            moreBtnStatus = true;
        }

        return moreBtnStatus;
    };


    async function handleCommentSubmit(event) {
        event.preventDefault();
        const newPageNumber = 0;

        const reqBody = getReqBody(event.target);
        if (!reqBody) {
            return;
        }

        const res = await apiManager.newComment(reqBody);
        if (res.errors) {
            return;
        }

        event.target.reset();

        const comments = await apiManager.getComments(
            postId, newPageNumber
        );
        if (comments.errors) {
            return;
        }

        const moreBtnStatus = checkForMoreCmts(
            comments.comments
        );
        setComments(
            getCommentCards(comments.comments, comments.user)
        );
        setMoreBtn(moreBtnStatus);
        setPageNumber(newPageNumber);
        setUser(comments.user);
        headerRef.current.updateUser(comments.user);
    };


    async function handleCommentDelete() {
        const newPageNumber = 0;
        
        const res = await apiManager.getComments(
            postId, newPageNumber
        );

        if (res.errors) {
            return;
        }

        const moreBtnStatus = checkForMoreCmts(res.comments);
        setComments(getCommentCards(res.comments, res.user));
        setPageNumber(newPageNumber);
        setMoreBtn(moreBtnStatus);
        setUser(res.user);
        headerRef.current.updateUser(res.user);
    };


    async function handlePagination(pageChange) {
        const newPageNumber = (pageNumber + pageChange >= 0) ?
        pageNumber + pageChange : pageNumber;

        const res = await apiManager.getComments(
            postId, newPageNumber
        );

        if (res.errors) {
            return;
        }

        const moreBtnStatus = checkForMoreCmts(res.comments);
        setComments(getCommentCards(res.comments, res.user));
        setPageNumber(newPageNumber);
        setMoreBtn(moreBtnStatus);
        setUser(res.user);
        headerRef.current.updateUser(res.user);
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
            <PaginationButtons
                moreBtn={moreBtn}
                pageNumber={pageNumber}
                handleClick={handlePagination}
                comments={true}
            />
        </div>
    </div>
    );
};



export default PostPage;