import "../styles/commentForm.css";



function CommentForm() {
    return (
        <form className="comment-form">
            <div>
                <textarea 
                    name="text" 
                    id="text" 
                    placeholder="Leave a comment"
                    required
                ></textarea>
                <button>Comment</button>
            </div>
        </form>
    );
};



export default CommentForm;