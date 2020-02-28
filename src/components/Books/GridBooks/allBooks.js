
import OneBook from '../OneBook/OneGridBook';
import './gridBookStyle.css';
import ReactPaginate from 'react-paginate';
import BookService from "../../../repository/axiosBookRepository";
import React, {useEffect, useState} from "react";
import axios from "../../../cutom-axios/axios";
const getAllBooks=(props)=>{
   const [userHasTheBook,setUserHasTheBook]=useState({});
    const [allBooks,setAllBooks]=useState({});
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(6);

    useEffect(()=>{

        axios.get("/books",{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{

            setAllBooks(data.data.content),
                setPage(data.data.page),
                setPageSize(data.data.pageSize),
                setTotalPages(data.data.totalPages)
        })
    },[]);


    const loadRequests=(page)=>{
        debugger;
        return  axios.get("/books",{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{

            setAllBooks(data.data.content),
                setPage(data.data.page),
                setPageSize(data.data.pageSize),
                setTotalPages(data.data.totalPages)
        })
    }

    const onDeleteBook=(i)=>{
        BookService.deleteBook(i).then((response)=>{
           loadRequests(0);
        })
    }


    //console.log(Array.of(props.books));
    console.log(allBooks)
    const allBooksFav=Object.values(allBooks);
    const oneBookGrid=allBooksFav.map((book,index)=>{
      // console.log(book);
        //getBookFav(book.name)
       // console.log(userHasTheBook);
       //  axios.get("/books/checkIfUserHasThisBookFav/"+props.id+"/"+book.name).then((result)=>{
       //      setUserHasTheBook(result.data)
       //  })
        return(

            <OneBook  id={props.id} okFavourites={props.okFavourites} errorMessageFavourite={props.errorMessageFavourite} addFavourite={props.addFavourite} onDelete={onDeleteBook} bookName={book.name} author={book.author} book={book} key={index} colClass={"col-md-4 mt-2 col-sm-12 "}/>

        ) ;
    });
    const handlePageClick = (e) => {
        loadRequests(e.selected)
    }

    const paginate = () => {
       // debugger;
        if (totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={page}
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