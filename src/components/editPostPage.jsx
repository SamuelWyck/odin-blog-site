import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import apiManager from "../utils/apiManager";
import CommentCard from "./commentCard.jsx";
import PostForm from "./postForm.jsx";
import PaginationButtons from "./paginationButtons.jsx";



function EditPostPage() {
    const {postId} = useParams();
    const {headerRef} = useOutletContext();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [apiKey, setApiKey] = useState(null);
    const [moreBtn, setMoreBtn] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);


    useEffect(function() {
        Promise.all([
            apiManager.getApiKey(),
            apiManager.getAuthoredPost(postId)
        ]).then(function(res) {
            const [apiRes, postRes] = res;
            if (
                apiRes.errors || postRes.errors || !postRes.post
            ) {
                return;
            }

            const moreBtnStatus = checkForMoreCmts(
                postRes.post.comments
            );
            headerRef.current.updateUser(postRes.user);
            setApiKey(apiRes.key);
            setComments(getCommentCards(
                postRes.post.comments, postRes.user
            ));
            setPost(postRes.post);
            setMoreBtn(moreBtnStatus);
        });
    }, [postId, headerRef]);


    function checkForMoreCmts(commentList) {
        let moreBtnStatus = false;

        const numberComments = commentList.length;
        if (numberComments === apiManager.cmtPageLength) {
            commentList.pop();
            moreBtnStatus = true;
        }

        return moreBtnStatus;
    };


    function getCommentCards(comments, user) {
        const commentCards = [];
        for (let comment of comments) {
            commentCards.push(
                <CommentCard
                    key={comment.id}
                    comment={comment}
                    user={user}
                    admin={true}
                    updateComments={handleCommentDelete}
                />
            );
        }
        return commentCards;
    };


    async function handleCommentDelete() {
        const newPageNumber = 0;

        const res = await apiManager.getComments(
            post.id, newPageNumber
        );
        if (res.errors) {
            return;
        }

        const moreBtnStatus = checkForMoreCmts(res.comments);
        setComments(getCommentCards(res.comments, res.user));
        setPageNumber(newPageNumber);
        setMoreBtn(moreBtnStatus);
        headerRef.current.updateUser(res.user);
    };


    async function handlePagination(pageChange) {
        const newPageNumber = (pageNumber + pageChange >= 0) ?
        pageNumber + pageChange : 0;

        const res = await apiManager.getComments(
            post.id, newPageNumber
        );
        if (res.errors) {
            return;
        }

        const moreBtnStatus = checkForMoreCmts(res.comments);
        setComments(getCommentCards(res.comments, res.user));
        setPageNumber(newPageNumber);
        setMoreBtn(moreBtnStatus);
        headerRef.current.updateUser(res.user);
    };



    if (!apiKey) {
        return <p></p>;
    }

    return (
        <div className="full-edit-post">
        <PostForm 
            edit={true}
            apiKey={apiKey}
            titleValue={post.title}
            previewValue={post.preview}
            editorValue={post.text}
            published={post.posted}
            postId={post.id}
            imageId={post.imageId}
        />
        <p className="comments-title">Comments</p>
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



export default EditPostPage;