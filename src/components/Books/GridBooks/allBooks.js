import React from "react";
import OneBook from '../OneBook/OneGridBook';
import './gridBookStyle.css';
import ReactPaginate from 'react-paginate';
const getAllBooks=(props)=>{


    const oneBookGrid=props.books.map((book,index)=>{
        return(
            <OneBook onDelete={props.onDelete} bookName={book.name} book={book} key={index} colClass={"col-md-4 mt-2 col-sm-12 "}/>

        ) ;
    });
    const handlePageClick = (e) => {
        props.onPageClick(e.selected)
    }

    const paginate = () => {
       // debugger;
        if (props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    }

    return(
      <div className="container containerGridBook">
          <div className="row marginTop">
              {oneBookGrid}
          </div>
         <div >
             {paginate()}
         </div>
      </div>
    );
}

export default getAllBooks;