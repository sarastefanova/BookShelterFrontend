import OneBookFavourite from '../OneFavouriteBook/oneFavouriteBook'
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import axios from "../../../../cutom-axios/axios";
import './allFavBooksUserStyle.css'

const allFavouriteBooks=(props)=>{
    const [allBooks,setAllBooks]=useState({});
    const history = useHistory();
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(3);


    useEffect(()=>{

        // axios.get("/user/getAllFavouriteBooksUser/"+props.id).then((data)=>{
        //     setAllBooks(data.data)
        // })

        axios.get("/user/getAllFavouriteBooksUserPaginate/"+props.id,{
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

    const  onDeleteBookFavourite=(name)=>{
        console.log(name)
        axios.delete("/user/deleteFavouriteBookUser/"+props.id+"?name="+name).then((response)=>{
            axios.get("/user/getAllFavouriteBooksUserPaginate/"+props.id,{
                headers: {
                    'page':page,'page-size':pageSize
                }
            }).then((data)=>{

                setAllBooks(data.data.content),
                    setPage(data.data.page),
                    setPageSize(data.data.pageSize),
                    setTotalPages(data.data.totalPages)
            })
        })
    }


    console.log(allBooks)
    const allBooksFav=Object.values(allBooks);
    const oneBookTerm=allBooksFav.map((book,index)=>{
        return(
            <OneBookFavourite addOrder={props.addOrder} onDeleteBookFav={onDeleteBookFavourite} id={props.id} bookName={book.name} book={book} key={index} />

        ) ;
    });


    const loadRequests=(page)=>{
        debugger;
        return axios.get("/user/getAllFavouriteBooksUserPaginate/"+props.id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{
            console.log(data.data)
            setAllBooks(data.data.content),
                setPage(data.data.page),
                setPageSize(data.data.pageSize),
                setTotalPages(data.data.totalPages)
        })
    }

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

        <div className="row container containerAllFavBooks">

            <div className="table-responsive">
                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
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
export default allFavouriteBooks;