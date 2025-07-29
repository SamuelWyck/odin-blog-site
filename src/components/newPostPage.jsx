import "../styles/newPostPage.css";
import EditorElement from "./EditorElement.jsx";
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import apiManager from "../utils/apiManager.js";
import ErrorsPartial from "./errorsPartial.jsx";



function NewPostPage() {
    const {headerRef} = useOutletContext();
    const navigate = useNavigate();
    const [txtValue, setTxtValue] = useState("");
    const [apiKey, setApiKey] = useState(null);
    const [errors, setErrors] = useState(null);

    
    useEffect(function() {
        apiManager.getApiKey().then(function(res) {
            if (res.errors) {
                return;
            }

            setApiKey(res.key);
            headerRef.current.updateUser(res.user);
        })
    }, [headerRef]);


    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let reqBody = {
            text: txtValue
        };
        for (let entry of formData.entries()) {
            const [key, value] = entry;
            console.log(entry)
            reqBody[key] = value;
        }
        reqBody = JSON.stringify(reqBody);


        apiManager.newAuthoredPost(reqBody).then(function(res) {
            if (res.errors) {
                setErrors(res.errors);
                return;
            }

            navigate("/admin/posts");
        })
    };


    function editorChange(value) {
        setTxtValue(value);
    };



    if (!apiKey) {
        return <p></p>;
    }

    return (
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
                />
                <div>
                    <label htmlFor="published">Publish? </label>
                    <input type="checkbox" name="published" id="published" />
                </div>
            </div>
            <div className="preview-wrapper">
                <input 
                    type="text" 
                    name="preview" 
                    placeholder="Preview statement"
                    required
                />
            </div>
            <EditorElement apiKey={apiKey} initValue={""} handleChange={editorChange} />
            <button>Create Post</button>
        </form>
        </div>
    );
};



export default NewPostPage;