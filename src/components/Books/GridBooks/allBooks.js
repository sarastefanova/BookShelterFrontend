import React from "react";
import OneBook from '../OneBook/OneGridBook';
import './gridBookStyle.css'
const getAllBooks=(props)=>{


    const oneBookGrid=props.books.map((book,index)=>{
        return(
            <OneBook  bookName={book.name} book={book} key={index} colClass={"col-md-4 mt-2 col-sm-12 "}/>

        ) ;
    });

    return(
      <div className="container containerGridBook">
          <div className="row marginTop">
              {oneBookGrid}
          </div>
      </div>
    );
}

export default getAllBooks;