
import OneBook from '../OneBook/OneGridBook';
import './gridBookStyle.css';
import ReactPaginate from 'react-paginate';
import React, {useEffect, useState} from "react";
const getAllBooks=(props)=>{
    const [page,setPage]=useState(0);

    useEffect(()=>{


    },[]);

    console.log(props.books);


    const allBooksFav=Object.values(props.books);
    const oneBookGrid=allBooksFav.map((book,index)=>{

        return(

            <OneBook page={page} getAllFavBooksUser={props.getAllFavBooksUser} colorHeart={"#cc0044"} id={props.id} okFavourites={props.okFavourites} errorMessageFavourite={props.errorMessageFavourite} addFavourite={props.addFavourite} onDelete={props.onDeleteBook} bookName={book.book.name} inFavourite={book.inFavourite} author={book.book.author} book={book.book} key={index} colClass={"col-md-4 mt-2 col-sm-12 "}/>

        ) ;
    });



    const handlePageClick = (e) => {
        setPage(e.selected);
       // loadRequests(e.selected)
        props.onPageClick(e.selected);
        console.log(e.selected);
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
         <div className="paginateBooks">
             {paginate()}
         </div>
      </div>
    );
}

export default getAllBooks;