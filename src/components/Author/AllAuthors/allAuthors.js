import React from "react";
import OneAuthor from '../OneAuthor/oneAuthor'
import './allAuthorsContainer.css'
import ReactPaginate from "react-paginate";
const getAllAuthors=(props)=>{

    const oneAuthorTerm=props.authors.map((author,index)=>{
        return(
            <OneAuthor onDelete={props.onDelete} isDeleted={author.isDeleted}  nameAndSurname={author.nameAndSurname} term={author} key={index} />

        ) ;
    });


    const handlePageClick = (e) => {
        props.onPageClick(e.selected)
    };

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


    console.log(props.authors.nameAndSurname)
    return(

            <div className="row container containerAllAuthors">
                <h4 className="text-upper text-left mt-5">All authors</h4>
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
                        {oneAuthorTerm}
                        </tbody>
                    </table>
                </div>
                <div className="paginateAuthor">
                    {paginate()}
                </div>
            </div>

    )
};

export default getAllAuthors;