import React from "react";
import OneNewestBook from '../OneNewestBook/oneNewestBook'
import './newestBooksStyle.css'
const allNewestBooks=(props)=> {


    const oneBookNewest=props.booksNewest.map((book,index)=> {
        return(
            <OneNewestBook book={book} bookName={book.name} key={index} colClass={"col-md-4 mt-2 col-sm-12 "}/>
        )
    })


    return(
        <div className="container containerNewestBooks">
            <h4>Our newest books!</h4>
            <div className="row marginTop">
                {oneBookNewest}
            </div>
        </div>
    );

}
export default allNewestBooks;
