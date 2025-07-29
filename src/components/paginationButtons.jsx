import "../styles/paginationButtons.css";



function PaginationButtons({pageNumber, moreBtn, handleClick}) {


    function changePageNumber(change) {
        handleClick(change);
        window.scrollTo({top: 0, behavior: "smooth"});
    };


    return (
        <div className="pagination-btns">
            {(pageNumber > 0) ?
                <button onClick={() => changePageNumber(-1)}>
                    Prev Posts
                </button> :
                <p></p>
            }
            <p></p>
            {(moreBtn) ?
                <button onClick={() => changePageNumber(1)}>
                    More Posts
                </button> :
                <p></p>
            }
        </div>
    );
};



export default PaginationButtons;