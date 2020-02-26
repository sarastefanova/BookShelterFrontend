import OneOrderedBook from '../OneOrderedBookUser/oneOrderedBook'
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import axios from "../../../../cutom-axios/axios";
import './allOrderedBooksStyle.css'

const allOrderedBooks=(props)=>{
    const [allBooksOrdered,setAllBooksOrdered]=useState({});
    const history = useHistory();
    const {id}=useParams();


    useEffect(()=>{

        // axios.get("/user/allOrderedBooks/"+id).then((data)=>{
        //     setAllBooksOrdered(data.data)
        // })

        axios.get("/user/allOrderedBooksStatus/"+id).then((data)=>{
            setAllBooksOrdered(data.data)
        })
    },[]);



    const  onDeleteBookOrdered=(name)=>{

        axios.delete("/user/deleteOrderedBookUser/"+id+"?name="+name).then((response)=>{
            console.log("bla");
            axios.get("/user/allOrderedBooks/"+id).then((data)=>{
                setAllBooksOrdered(data.data)
            })
        })
    }

    // console.log(props.id)
    const allBooksFav=Object.values(allBooksOrdered);
    const oneBookTerm=allBooksFav.map((book,index)=>{
        return(
            <OneOrderedBook onDeleteBookOrdered={onDeleteBookOrdered}  bookName={book.name} book={book} key={index} />

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

        <div className="row container containerAllOrderedBooks">

            <div className="table-responsive">
                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                        <th scope="col">Status</th>
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
export default allOrderedBooks;