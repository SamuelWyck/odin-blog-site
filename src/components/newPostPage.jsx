import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import apiManager from "../utils/apiManager.js";
import PostForm from "./postForm.jsx";



function NewPostPage() {
    const {headerRef} = useOutletContext();
    const [apiKey, setApiKey] = useState(null);

    
    useEffect(function() {
        apiManager.getApiKey().then(function(res) {
            if (res.errors) {
                return;
            }

            setApiKey(res.key);
            headerRef.current.updateUser(res.user);
        })
    }, [headerRef]);



    if (!apiKey) {
        return <p></p>;
    }

    return (
        <PostForm
            edit={false}
            postId={null}
            editorValue={""}
            titleValue={""}
            previewValue={""}
            published={false}
            apiKey={apiKey}
        />
    );
};



export default NewPostPage;