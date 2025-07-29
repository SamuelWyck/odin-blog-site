import "../styles/editPostPage.css";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import apiManager from "../utils/apiManager";
import CommentCard from "./commentCard.jsx";
import ErrorsPartial from "./errorsPartial.jsx";
import EditorElement from "./EditorElement.jsx";



function EditPostPage() {
    const {postId} = useParams();
    const navigate = useNavigate();
    const {headerRef} = useOutletContext();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [apiKey, setApiKey] = useState(null);
    const [errors, setErrors] = useState(null);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [editorTxt, setEditorTxt] = useState("");


    useEffect(function() {
        Promise.all([
            apiManager.getApiKey(),
            apiManager.getAuthoredPost(postId)
        ]).then(function(res) {
            const [apiRes, postRes] = res;
            if (apiRes.errors || postRes.errors || !postRes.post) {
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
            setEditorTxt(postRes.post.text);
            headerRef.current.updateUser(postRes.user);
        });
    }, [postId, navigate, headerRef]);


    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let reqBody = {
            text: editorTxt
        };
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            reqBody[key] = value;
        }
        reqBody = JSON.stringify(reqBody);

        const res = await apiManager.editAuthoredPost(
            reqBody, 
            postId
        );

        if (res.errors) {
            setErrors(res.errors);
            return;
        }

        navigate("/admin/posts");
    };


    function editorChange(value) {
        setEditorTxt(value);
    };


    async function deletePost() {
        const res = await apiManager.deleteAuthoredPost(postId);
        if (res.errors) {
            return;
        }

        navigate("/admin/posts");
    };


    if (!apiKey) {
        return <p></p>;
    }


    return (
        <div className="full-edit-post">
        <div className="post-form-wrapper">
        <form className="new-post-form" onSubmit={handleSubmit}>
            <ErrorsPartial errors={errors} />
            <div className="title-publish-wrapper">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title"
                    className="new-post-title" 
                    maxLength={200}
                    required
                    defaultValue={post.title}
                />
                <div>
                    <label htmlFor="published">Publish? </label>
                    <input 
                        type="checkbox" 
                        name="published" 
                        id="published" 
                        defaultChecked={post.posted}
                    />
                </div>
            </div>
            <div className="preview-wrapper">
                <input 
                    type="text" 
                    name="preview" 
                    placeholder="Preview statement"
                    required
                    defaultValue={post.preview}
                />
            </div>
            <EditorElement 
                apiKey={apiKey} 
                initValue={post.text} 
                handleChange={editorChange} 
            />
            <button>Save Post</button>
            <button 
                type="button" 
                onClick={function() {setDeletePrompt(true)}}
            >Delete Post</button>
            {
            !deletePrompt ||
            <div className="post-del-btns-wrapper">
                <button 
                    type="button"
                    onClick={function() {setDeletePrompt(false)}}
                >Cancel</button>
                <button 
                    type="button"
                    onClick={deletePost}
                >Delete</button>
            </div>
            }
        </form>
        </div>

        <p className="comments-title">Comments</p>
        <div className="comments">
            {comments}
        </div>
        </div>
    ); 
};



export default EditPostPage;