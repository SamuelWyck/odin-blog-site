import "../styles/paginationButtons.css";



function PaginationButtons({
    pageNumber, moreBtn, handleClick, comments
}) {


    function changePageNumber(change) {
        handleClick(change);
        if (!comments) {
            window.scrollTo();
        }
    };


    if (pageNumber === 0 && !moreBtn) {
        return null;
    }


    return (
        <div className="pagination-btns">
            {(pageNumber > 0) ?
                <button onClick={() => changePageNumber(-1)}>
                    {
                        (comments) ?
                        "Prev Cmts" : "Prev Posts"
                    }
                </button> :
                <p></p>
            }
            <p></p>
            {(moreBtn) ?
                <button onClick={() => changePageNumber(1)}>
                    {
                        (comments) ? 
                        "More Cmts" : "More Posts"
                    }
                </button> :
                <p></p>
            }
        </div>
    );
};



export default PaginationButtons;