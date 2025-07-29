import "../styles/postForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiManager from "../utils/apiManager";
import ErrorsPartial from "./errorsPartial";
import EditorElement from "./EditorElement";



function PostForm({
    titleValue, 
    editorValue, 
    previewValue, 
    published, 
    apiKey, 
    edit,
    postId
}) {
    const navigate = useNavigate();
    const [editorTxt, setEditorTxt] = useState(editorValue);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [errors, setErrors] = useState(null);


    async function deletePost() {
        const res = await apiManager.deleteAuthoredPost(postId);
        if (res.errors) {
            return;
        }

        navigate("/admin/posts");
    };


    function editorChange(value) {
        setEditorTxt(value);
    };


    async function editSubmit(event) {
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


    async function newSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let reqBody = {
            text: editorTxt
        };
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            console.log(entry)
            reqBody[key] = value;
        }
        reqBody = JSON.stringify(reqBody);

        const res = await apiManager.newAuthoredPost(reqBody);

        if (res.errors) {
            setErrors(res.errors);
            return;
        }

        navigate("/admin/posts");
    };


    return (
        <div className="post-form-wrapper">
        <form className="new-post-form" 
            onSubmit={(edit) ? editSubmit : newSubmit}
        >
            <ErrorsPartial errors={errors} />
            <div className="title-publish-wrapper">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title"
                    className="new-post-title" 
                    maxLength={200}
                    required
                    defaultValue={titleValue}
                />
                <div>
                    <label htmlFor="published">Publish? </label>
                    <input 
                        type="checkbox" 
                        name="published" 
                        id="published" 
                        defaultChecked={published}
                    />
                </div>
            </div>
            <div className="preview-wrapper">
                <input 
                    type="text" 
                    name="preview" 
                    placeholder="Preview statement"
                    required
                    defaultValue={previewValue}
                />
            </div>
            <EditorElement 
                apiKey={apiKey} 
                initValue={editorValue} 
                handleChange={editorChange} 
            />
            <button>
                {(edit) ? "Save Post" : "Create Post"}
            </button>
            {!edit ||
            <>
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
            </>
            }
        </form>
        </div>
    ); 
};



export default PostForm;