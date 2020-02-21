import React,{useState,useEffect} from "react";
import axios from '../../../cutom-axios/axios'
import './detailsAuthorStyle.css'
import {Link, useParams} from "react-router-dom";
import Img from "react-image";
import bookImg from "../../AllPhotos/books.png";
import authorPhoto from '../../AllPhotos/authorImg.jpg';
const detailsAuthor=(props)=>{
    const [detailsForAuthor,setDetailsAuthor]=useState({});
    const [allBooksAuthor,setAllBooksAuthor]=useState({});
    const {nameAndSurname}=useParams();

    useEffect(()=>{
        axios.get("/author?nameAndSurname="+nameAndSurname).then((data)=>{
            setDetailsAuthor(data.data)
        }),
            axios.get("/books/getAllBooksByAuthor/"+nameAndSurname).then((data)=>{
                setAllBooksAuthor(data.data)
            })

    },[])



    const booksArray = Object.values(allBooksAuthor);
    const booksAuthor =booksArray.map((item) =>
        <div id={item.name} key={item.name} className="col-md-2 col-sm-6 col-xs-12">
            <div className="card-body image-box">
                {/*slikaa*/}<Link to={"/detailsBook/"+item.name}>
                <img src={`data:image/jpeg;base64,${item.file}`}  alt="imgBook" className=" rounded imgBook"/>
            </Link>
            </div>
            <div className="text-left font-italic font-weight-bold">
                <span className="ml-3">{item.name}</span><br/>
            </div>
        </div>
    );
  //  <li key={item.name}>{item.name}  </li>

    return(

        <div className="container containerDetails">
            <div className="row mt-5">

                <div className="col-md-4 mt-5">
                    <Img alt="" src={authorPhoto} className="topPhoto rounded"/>
                    <img src={`data:image/jpeg;base64,${detailsForAuthor.file}`}  alt="" className=" imgProfile rounded-circle"/>

                    <br/>



                </div>
                <div className="col-md-8 mt-5">
                    <span className="font-italic float-left colorH font-weight-bold nameProfile">Short biography about {detailsForAuthor.nameAndSurname}</span>
                    <br/>
                    <hr className="hrCostume"/>
                    <div className="float-left text-center">
                        {detailsForAuthor.shortAuthorBiography}

                    </div>
                </div>
            </div>
            <h4 className="colorH font-italic">All the books of {detailsForAuthor.nameAndSurname}</h4>
            <hr/>
            <div className="row">

                {booksAuthor}
            </div>
        </div>
    )


}
export default detailsAuthor;