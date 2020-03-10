
import OneBook from '../OneBook/OneGridBook';
import './gridBookStyle.css';
import ReactPaginate from 'react-paginate';
import BookService from "../../../repository/axiosBookRepository";
import React, {useEffect, useState} from "react";
import axios from "../../../cutom-axios/axios";
import OneRequestAdmin from "../../User/AllRequests/OneRequestAdmin/oneRequestAdmin";
import {useHistory} from "react-router";
const getAllBooks=(props)=>{
   const [userHasTheBook,setUserHasTheBook]=useState({});
    const [allBooks,setAllBooks]=useState({});
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(3);
    const history=useHistory();
    useEffect(()=>{

          // if(props.searchedBook){
          //     debugger;
          //     setAllBooks(props.booksSearch),
          //         setPage(props.pageSearch),
          //         setPageSize(props.pageSizeSearch),
          //         setTotalPages(props.totalPagesSearch)
          //     debugger;
          //     console.log(allBooks)
          // }else {
          //
          // }
        // axios.get("/books",{
        //     headers: {
        //         'page':page,'page-size':pageSize
        //     }
        // }).then((data)=>{
        //     debugger;
        //     setAllBooks(data.data.content),
        //         setPage(data.data.page),
        //         setPageSize(data.data.pageSize),
        //         setTotalPages(data.data.totalPages)
        //     debugger;
        // // })

                    // setAllBooks(props.books);
                    // setPage(props.page);
                    // setPageSize(props.pageSize);
                    // setTotalPages(props.totalPages);
                    // console.log(props.totalPages)

    },[]);

    console.log(props.books);

    const loadRequests=(page)=>{
       // debugger;
      //   return  axios.get("/books/getAllBooksUser?id="+props.id,{
      //       headers: {
      //           'page':page,'page-size':pageSize
      //       }
      //   }).then((data)=>{
      //       console.log(data);
      //       setAllBooks(data.data.content),
      //           setPage(data.data.page),
      //           setPageSize(data.data.pageSize),
      //           setTotalPages(data.data.totalPages)
      //   })
      // //  props.loadBooksPaginateAllBooksUser(page);
      //   debugger;

    }

    const onDeleteBook=(i)=>{
        debugger;
        BookService.deleteBook(i).then((response)=>{
           loadRequests(0);
        })
    }


    //console.log(Array.of(props.books));
    //console.log(Object.values(allBooks));
    const allBooksFav=Object.values(props.books);
    const oneBookGrid=allBooksFav.map((book,index)=>{

        return(

            <OneBook page={page} getAllFavBooksUser={props.getAllFavBooksUser} colorHeart={"#cc0044"} id={props.id} okFavourites={props.okFavourites} errorMessageFavourite={props.errorMessageFavourite} addFavourite={props.addFavourite} onDelete={onDeleteBook} bookName={book.book.name} inFavourite={book.inFavourite} author={book.book.author} book={book.book} key={index} colClass={"col-md-4 mt-2 col-sm-12 "}/>

        ) ;
    });


    // console.log(totalPages)
    // const allRequestsAdminBooks=Object.values(allRequestsAdmin);
    // //console.log((JSON.stringify(allRequestsAdminBooks[3])))
    // const oneRequestTerm=allRequestsAdminBooks.map((book,index)=>{
    //
    //
    //     return(
    //
    //         <OneRequestAdmin o declineOrder={declineOrder} approveOrder={approveOrder} user={book.user}  bookName={book.book.name}  book={book.book} key={index} />
    //
    //     ) ;
    // });

    const handlePageClick = (e) => {
       // loadRequests(e.selected)
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
         <div className="paginateBooks">
             {paginate()}
         </div>
      </div>
    );
}

export default getAllBooks;