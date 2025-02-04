import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import './detailsBookStyle.css';
import {Link} from "react-router-dom";
import BookService from "../../../repository/axiosBookRepository";
const detailsBook=(props)=>{


    const [detailsForBook,setDetailsForBook]=useState({});
    const [theAuthor,setTheAuthor]=useState({});
    const {name}=useParams();

    useEffect(()=>{
        BookService.getBookById(name).then((data)=>{
            setDetailsForBook(data.data)
        });
            BookService.getAuthorBook(name).then((data)=>{
                setTheAuthor(data.data)
            })
    },[]);

    return(
        <div className="container containerDetails">
            <div className="row mt-5">

                <div className="col-md-4 mt-5">
                    {/*<Img alt="" src={authorPhoto} className="topPhoto rounded"/>*/}
                    <img src={`data:image/jpeg;base64,${detailsForBook.file}`}  alt="" className="topPhoto rounded" />

                    <br/>

                    <span className="font-weight-bold font-italic  nameBook mt-5"> By <Link to={"/detailsAuthor/"+theAuthor.nameAndSurname}><span className="text-dark">{theAuthor.nameAndSurname}</span></Link></span>
                    <p className="font-weight-bold font-italic nameProfile ml-4 mt-2">$ {detailsForBook.price}</p>

                </div>
                <div className="col-md-8 mt-5">
                    <span className="font-italic float-left colorH font-weight-bold nameProfile">Short content of the book</span>
                    <br/>
                    <hr className="hrCostume"/>
                    <div className="float-left  shortContentBook">
                        {detailsForBook.shortContentBook}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default detailsBook;