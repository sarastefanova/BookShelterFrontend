import OneBookFavourite from '../OneFavouriteBook/oneFavouriteBook'
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import axios from "../../../../cutom-axios/axios";
import './allFavBooksUserStyle.css'

const allFavouriteBooks=(props)=>{
    const [allBooks,setAllBooks]=useState({});
    const history = useHistory();



    useEffect(()=>{

        axios.get("/user/allFavouriteBooksOfUser/"+props.id).then((data)=>{
            setAllBooks(data.data)
        })
    },[]);

    const  onDeleteBookFavourite=(name)=>{
        console.log(name)
        axios.delete("/user/deleteFavBookUser/"+props.id+"?name="+name).then((response)=>{
            axios.get("/user/allFavouriteBooksOfUser/"+props.id).then((data)=>{
                setAllBooks(data.data)
            })
        })
    }


    console.log(allBooks)
    const allBooksFav=Object.values(allBooks);
    const oneBookTerm=allBooksFav.map((book,index)=>{
        return(
            <OneBookFavourite addOrder={props.addOrder} onDeleteBookFav={onDeleteBookFavourite} bookName={book.name} book={book} key={index} />

        ) ;
    });


    // const handlePageClick = (e) => {
    //     props.onPageClick(e.selected)
    // };
    //
    // const paginate = () => {
    //     // debugger;
    //     if (props.totalPages !== 0) {
    //         return (
    //             <ReactPaginate previousLabel={"previous"}
    //                            nextLabel={"next"}
    //                            breakLabel={<span className="gap">...</span>}
    //                            breakClassName={"break-me"}
    //                            pageCount={props.totalPages}
    //                            marginPagesDisplayed={2}
    //                            pageRangeDisplayed={5}
    //                            pageClassName={"page-item"}
    //                            pageLinkClassName={"page-link"}
    //                            previousClassName={"page-item"}
    //                            nextClassName={"page-item"}
    //                            previousLinkClassName={"page-link"}
    //                            nextLinkClassName={"page-link"}
    //                            forcePage={props.page}
    //                            onPageChange={handlePageClick}
    //                            containerClassName={"pagination justify-content-center"}
    //                            activeClassName={"active"}/>
    //         )
    //     }
    // }



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
            <div className="paginateAuthor">
                {/*{paginate()}*/}
            </div>
        </div>

    )
}
export default allFavouriteBooks;