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
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(4);

    useEffect(()=>{

        // axios.get("/user/allOrderedBooks/"+id).then((data)=>{
        //     setAllBooksOrdered(data.data)
        // })

        // axios.get("/user/allOrderedBooksStatus/"+id).then((data)=>{
        //     setAllBooksOrdered(data.data)
        // })//ovaa go koristeme za obicno bez paginacija

        axios.get("/user/allOrderedBooksStatusPaginate/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{

            setAllBooksOrdered(data.data.content),
                setPage(data.data.page),
                setPageSize(data.data.pageSize),
                setTotalPages(data.data.totalPages)
        })
    },[]);

    const loadRequests=(page)=>{
        debugger;
        return axios.get("/user/allOrderedBooksStatusPaginate/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{
            console.log(data.data)
            setAllBooksOrdered(data.data.content),
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


    const  onDeleteBookOrdered=(name)=>{

        axios.delete("/user/deleteOrderedBookUserStatus/"+id+"?name="+name).then((response)=>{
            console.log("bla");
            return axios.get("/user/allOrderedBooksStatusPaginate/"+id,{
                headers: {
                    'page':page,'page-size':pageSize
                }
            }).then((data)=>{
                console.log(data.data)
                setAllBooksOrdered(data.data.content),
                    setPage(data.data.page),
                    setPageSize(data.data.pageSize),
                    setTotalPages(data.data.totalPages)
            })
        })
    }

    // console.log(props.id)
    const allBooksFav=Object.values(allBooksOrdered);
    const oneBookTerm=allBooksFav.map((book,index)=>{
        return(
            <OneOrderedBook onDeleteBookOrdered={onDeleteBookOrdered} id={id}  bookName={book.name} book={book} key={index} />

        ) ;
    });




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
            <div className="paginateAllOrderedBooksStyle">
                {paginate()}
            </div>
        </div>

    )
}
export default allOrderedBooks;