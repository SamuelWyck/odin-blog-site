import "../styles/commentCard.css";
import readableDate from "../utils/readableDate";
import { useState } from "react";
import apiManager from "../utils/apiManager";
import snakeImg from "../assets/snake.png";



function CommentCard({comment, user}) {
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [editPrompt, setEditPrompt] = useState(false);
    const [editing, setEditing] = useState(false);
    const [textValue, setTextValue] = useState(comment.text);
    const [deleted, setDeleted] = useState(false);


    function handleDeletePrompt() {
        if (!editPrompt) {
            setDeletePrompt(true);
        }
    };

    
    function handleEditPrompt() {
        if (!deletePrompt) {
            setEditPrompt(true);
            setEditing(true);
        }
    };


    function handleDeleteCancel() {
        setDeletePrompt(false);
    };


    function handleEditCancel() {
        setEditing(false);
        setEditPrompt(false);
        setTextValue(comment.text);
    };


    function handleCommentChange(event) {
        setTextValue(event.target.value);
    };


    async function handleEdit() {
        let reqBody = {
            text: textValue,
            postid: comment.parentId
        };
        reqBody = JSON.stringify(reqBody);

        const res = await apiManager.editComment(
            reqBody, 
            comment.id
        );

        if (res.errors) {
            return;
        }

        comment.text = textValue;
        handleEditCancel();
    };


    async function handleDelete() {
        const res = await apiManager.deleteComment(comment.id);

        if (res.errors) {
            return;
        }

        setDeleted(true);
    };


    if (deleted) {
        return null;
    }

    return (
    <div className="comment-card">
        <img src={snakeImg} alt="snake" className="post-img" />
        <div className="comment-info">
            <p className="comment-user">
                @{comment.author.username}
                <span className="comment-date"> {readableDate(comment.createdAt)}</span>
            </p>
            {(user && user.id === comment.authorId) ?
                <div className="comment-btns">
                    <button onClick={handleEditPrompt}>Edit</button>
                    <button onClick={handleDeletePrompt}>
                        Delete
                    </button>
                </div> : 
                null
            }
        </div> 
        {(!editing) ? 
            <textarea 
                name="text" 
                readOnly 
                className="comment-txt" 
                value={textValue} 
            >
            </textarea> :
            <textarea 
                name="text" 
                className="editing-comment-txt" 
                onChange={handleCommentChange} 
                value={textValue}
            >
            </textarea>
        }
        {(deletePrompt) ? 
            <div className="prompt-btns">
                <button onClick={handleDeleteCancel}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div> :
            null
        }
        {(editPrompt) ? 
            <div className="prompt-btns">
                <button onClick={handleEditCancel}>Cancel</button>
                <button onClick={handleEdit}>Save</button>
            </div> :
            null
        }
    </div>
    );
};



export default CommentCard;