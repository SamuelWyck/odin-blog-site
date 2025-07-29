import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import apiManager from "../utils/apiManager";
import CommentCard from "./commentCard.jsx";
import PostForm from "./postForm.jsx";



function EditPostPage() {
    const {postId} = useParams();
    const {headerRef} = useOutletContext();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [apiKey, setApiKey] = useState(null);


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

            const comments = [];
            for (let comment of postRes.post.comments) {
                comments.push(
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        user={postRes.user}
                        admin={true}
                    />
                );
            }

            setApiKey(apiRes.key);
            setComments(comments);
            setPost(postRes.post);
            headerRef.current.updateUser(postRes.user);
        });
    }, [postId, headerRef]);



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
        />
        <p className="comments-title">Comments</p>
        <div className="comments">
            {comments}
        </div>
        </div>
    ); 
};



export default EditPostPage;