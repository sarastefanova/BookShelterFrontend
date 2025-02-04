import OneRequestAdmin from '../OneRequestAdmin/oneRequestAdmin';
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import './allRequestsStyle.css'
import UserService from "../../../../repository/axiosUserRepository";

const allRequests=(props)=>{
    const [allRequestsAdmin,setAllRequests]=useState({});
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(4);


    useEffect(()=>{

        UserService.getAllRequestsPaginate(page, pageSize).then((data)=>{

            setAllRequests(data.data.content);
            setPage(data.data.page);
            setPageSize(data.data.pageSize);
            setTotalPages(data.data.totalPages);
        })


    },[]);

    const loadRequests=(page)=>{
        debugger;
        return  UserService.getAllRequestsPaginate(page, pageSize);
    };

    const handlePageClick = (e) => {
       loadRequests(e.selected).then((data)=>{

            setAllRequests(data.data.content);
            setPage(data.data.page);
            setPageSize(data.data.pageSize);
            setTotalPages(data.data.totalPages);
        })
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



    const approveOrder=(userId,bookName)=>{
        UserService.approveOrder(userId,bookName).then((response)=>{
            UserService.getAllRequestsPaginate(page, pageSize).then((data)=>{

                    setAllRequests(data.data.content);
                    setPage(data.data.page);
                    setPageSize(data.data.pageSize);
                    setTotalPages(data.data.totalPages);
            })
        })

    }

   const declineOrder=(userId,bookName)=>{
        UserService.declineOrder(userId,bookName).then((response)=>{
            UserService.getAllRequestsPaginate(page, pageSize).then((data)=>{

                setAllRequests(data.data.content);
                setPage(data.data.page);
                setPageSize(data.data.pageSize);
                setTotalPages(data.data.totalPages);
            })
        })
    }



    console.log(totalPages)
    const allRequestsAdminBooks=Object.values(allRequestsAdmin);

    const oneRequestTerm=allRequestsAdminBooks.map((book,index)=>{


        return(

            <OneRequestAdmin o declineOrder={declineOrder} approveOrder={approveOrder} user={book.user}  bookName={book.book.name}  book={book.book} key={index} />

        ) ;
    });



  if(Object.values(allRequestsAdmin).length!==0){
      return(

          <div className="row container containerAllRequestsBooks">

              <div className="table-responsive">
                  <table className="table tr-history table-striped small">
                      <thead>
                      <tr>

                          <th scope="col"></th>
                          <th scope="col">Name user</th>
                          <th scope="col">Name book</th>
                          <th scope="col">Quantity of book available</th>
                          <th scope="col">Name of the author</th>
                          <th scope="col">Actions</th>
                          <th scope="col"></th>
                      </tr>
                      </thead>
                      <tbody>
                      {oneRequestTerm}
                      </tbody>
                  </table>
              </div>
              <div className="paginateAllRequests">
                  {paginate()}
              </div>
          </div>

      )
  }else{
      return (
          <div className="row container containerAllRequestsBooks">
          <h3 className="mt-5">No requests for books in the moment</h3>
          </div>

      )
  }
}
export default allRequests;