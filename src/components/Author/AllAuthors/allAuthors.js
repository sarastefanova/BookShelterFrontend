import React from "react";
import OneAuthor from '../OneAuthor/oneAuthor'
import {Link} from "react-router-dom";
import './allAuthorsContainer.css'
const getAllAuthors=(props)=>{

    const oneAuthorTerm=props.authors.map((author,index)=>{
        return(
            <OneAuthor onDelete={props.onDelete}  nameAndSurname={author.nameAndSurname} term={author} key={index} />

        ) ;
    });

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

            </div>

    )
};

export default getAllAuthors;