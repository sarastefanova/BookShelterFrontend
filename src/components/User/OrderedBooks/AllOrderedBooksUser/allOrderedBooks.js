import OneOrderedBook from '../OneOrderedBookUser/oneOrderedBook'
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../../../cutom-axios/axios";
import './allOrderedBooksStyle.css'

const allOrderedBooks=(props)=>{
    const [allBooksOrdered,setAllBooksOrdered]=useState({});
    const {id}=useParams();
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(4);

    useEffect(()=>{



        axios.get("/user/allOrderedBooksStatusPaginate/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{

                setAllBooksOrdered(data.data.content);
                setPage(data.data.page);
                setPageSize(data.data.pageSize);
                setTotalPages(data.data.totalPages);
        })
    },[]);

    const getRequests = (page) =>{
        return axios.get("/user/allOrderedBooksStatusPaginate/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    };

    const loadRequests=(page)=>{
        debugger;
        getRequests(page).then((data)=>{
            console.log(data.data);
            setAllBooksOrdered(data.data.content);
            setPage(data.data.page);
            setPageSize(data.data.pageSize);
            setTotalPages(data.data.totalPages);
        });
    };



    const handlePageClick = (e) => {
        loadRequests(e.selected)
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


    const  onDeleteBookOrdered=(name)=>{

        axios.delete("/user/deleteOrderedBookUserStatus/"+id+"?name="+name).then((response)=>{
            console.log("bla");
            getRequests().then((data)=>{
                console.log(data.data);
                setAllBooksOrdered(data.data.content);
                setPage(data.data.page);
                setPageSize(data.data.pageSize);
                setTotalPages(data.data.totalPages);
            })
        })
    }

    // console.log(props.id)
    const allBooksOrder=Object.values(allBooksOrdered);
    const oneBookTerm=allBooksOrder.map((book,index)=>{
        return(
            <OneOrderedBook onDeleteBookOrdered={onDeleteBookOrdered} id={id}  bookName={book.name} book={book} key={index} />

        ) ;
    });




   if(Object.values(allBooksOrdered).length!==0){
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
   }else{
       return (
           <div className="row container containerAllOrderedBooks">

           <h3 className="mt-5">No ordered books in the moment</h3>
           </div>
       )
   }
}
export default allOrderedBooks;