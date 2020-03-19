import OneBookFavourite from '../OneFavouriteBook/oneFavouriteBook'
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import './allFavBooksUserStyle.css'
import UserService from "../../../../repository/axiosUserRepository";

const allFavouriteBooks=(props)=>{
    const [allBooks,setAllBooks]=useState({});
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(3);
    const [showOrder,setShowOrder]=useState("");


    useEffect(()=>{

        UserService.getFavouriteBooksUserPaginate(page, pageSize, props.id).then((data)=>{
                debugger;

                setAllBooks(data.data.content);
                setPage(data.data.page);
                setPageSize(data.data.pageSize);
                setTotalPages(data.data.totalPages);
        })
    },[]);

    const  onDeleteBookFavourite=(name)=>{

            UserService.deleteFavouriteBookUser(props.id, name).then((response)=>{
                UserService.getFavouriteBooksUserPaginate(page, pageSize, props.id).then((data)=>{
               // console.log(data.data.content);
                setAllBooks(data.data.content);
                setPage(data.data.page);
                setPageSize(data.data.pageSize);
                setTotalPages(data.data.totalPages);

                props.loadAllBooks();
            })
        })
    };

    const allBooksFav=Object.values(allBooks);

    const oneBookTerm=allBooksFav.map((book,index)=>{

        return(
            <OneBookFavourite addOrder={addOrder} page={page} onDeleteBookFav={onDeleteBookFavourite} isOrdered={book.isOrdered} user={book.user} id={props.id} bookName={book.book.name} book={book.book} key={index} />

        ) ;
    });

    const loadRequests=(page)=>{
        return UserService.getFavouriteBooksUserPaginate(page, pageSize, props.id);
    };

   function addOrder(name, page, id, user){
       debugger;
       setShowOrder("");
        UserService.addOrderedBook(id, name, user).then((response)=>{
            loadRequests(page).then((data)=>{
                setShowOrder("");
                setAllBooks(data.data.content);
                setPage(data.data.page);
                setPageSize(data.data.pageSize);
                setTotalPages(data.data.totalPages);
            });
        }, error => {
            setShowOrder(true);
            if (error.response.status === 409) {
                setShowOrder("You already ordered this book!");
            }
        })
    }

    const handlePageClick = (e) => {
        setShowOrder("");
        loadRequests(e.selected).then((data)=>{
            //console.log(data.data);
            setAllBooks(data.data.content);
            setPage(data.data.page);
            setPageSize(data.data.pageSize);
            setTotalPages(data.data.totalPages);
        });
    };

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


    if(Object.values(allBooks).length!==0){

        return (

            <div className="row container containerAllFavBooks">

                <div className="table-responsive">
                    <h5 className="font-weight-bold text-danger">{showOrder}</h5>
                    <table className="table tr-history table-striped small">
                        <thead>

                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {oneBookTerm}

                        </tbody>
                    </table>
                </div>
                <div className="paginateAllFavouriteBooksUser">
                    {paginate()}

                </div>
            </div>
        )
    }
    else{
        return (
             <h3>No favourite books in the moment</h3>
        )
    }

}
export default allFavouriteBooks;