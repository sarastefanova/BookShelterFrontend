import OneRequestAdmin from '../OneRequestAdmin/oneRequestAdmin';
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import axios from "../../../../cutom-axios/axios";
import './allRequestsStyle.css'

const allRequests=(props)=>{
    const [allRequestsAdmin,setAllRequests]=useState({});
    const history = useHistory();



    useEffect(()=>{

        // axios.get("/user/getAllRequestsOrders").then((data)=>{
        //     setAllRequests(data.data)
        // })

        axios.get("/user/getAllRequestsOrdersStatus").then((data)=>{
            setAllRequests(data.data)
        })
    },[]);

    // const  onDeleteBookFavourite=(name)=>{
    //     console.log(name)
    //     axios.delete("/user/deleteFavBookUser/"+props.id+"?name="+name).then((response)=>{
    //         axios.get("/user/allFavouriteBooksOfUser/"+props.id).then((data)=>{
    //             setAllBooks(data.data)
    //         })
    //     })
    // }


    console.log(allRequestsAdmin)
    const allRequestsAdminBooks=Object.values(allRequestsAdmin);
    const oneRequestTerm=allRequestsAdminBooks.map((book,index)=>{
        return(
            <OneRequestAdmin   bookName={book.name} book={book} key={index} />

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

        <div className="row container containerAllRequestsBooks">

            <div className="table-responsive">
                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name book</th>
                        <th scope="col">Quantity of book available</th>
                        <th scope="col">Name of the author</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {oneRequestTerm}
                    </tbody>
                </table>
            </div>
            <div className="paginateAuthor">
                {/*{paginate()}*/}
            </div>
        </div>

    )
}
export default allRequests;