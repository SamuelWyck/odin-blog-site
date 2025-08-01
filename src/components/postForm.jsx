import "../styles/postForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiManager from "../utils/apiManager.js";
import ErrorsPartial from "./errorsPartial.jsx";
import EditorElement from "./editorElement.jsx";



function PostForm({
    titleValue, 
    editorValue, 
    previewValue, 
    published, 
    apiKey, 
    edit,
    postId,
    imageId
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
        formData.append("text", editorTxt);
        formData.append("imageId", imageId);

        const res = await apiManager.editAuthoredPost(
            formData, 
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
        formData.append("text", editorTxt);

        const res = await apiManager.newAuthoredPost(formData);

        if (res.errors) {
            setErrors(res.errors);
            return;
        }

        navigate("/admin/posts");
    };


    return (
        <div className="post-form-wrapper">
        <form 
            className="new-post-form" 
            onSubmit={(edit) ? editSubmit : newSubmit}
            encType="multipart/form-data"
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
            <div className="upload-wrapper">
                <label 
                    className="image-upload" 
                    htmlFor="image"
                >Upload Image (jpg/png)</label>
                <input 
                    type="file" 
                    name="image" 
                    id="image" 
                    hidden 
                />
                {!imageId ||
                <div>
                <label htmlFor="delete-img">Delete Image?</label>
                <input 
                    type="checkbox" 
                    name="deleteImg" 
                    id="delete-img"
                />
                </div>
                }
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