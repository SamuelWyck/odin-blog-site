import "../styles/commentForm.css";



function CommentForm({handleSubmit}) {
    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div>
                <textarea 
                    name="text" 
                    id="text" 
                    placeholder="Leave a comment"
                    required
                    maxLength={10000}
                ></textarea>
                <button>Comment</button>
            </div>
        </form>
    );
};



export default CommentForm;