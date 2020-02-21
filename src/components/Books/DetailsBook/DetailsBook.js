import React, {useEffect, useState} from "react";
import Img from "react-image";
import authorPhoto from "../../AllPhotos/authorImg.jpg";
import {useParams} from "react-router";
import axios from "../../../cutom-axios/axios";
import './detailsBookStyle.css';
const detailsBook=(props)=>{


    const [detailsForBook,setDetailsForBook]=useState({});
    const {name}=useParams();

    useEffect(()=>{
        axios.get("/books?name="+name).then((data)=>{
            setDetailsForBook(data.data)
        })

    },[])

    console.log(detailsForBook.author)
    return(
        <div className="container containerDetails">
            <div className="row mt-5">

                <div className="col-md-4 mt-5">
                    <Img alt="" src={authorPhoto} className="topPhoto rounded"/>
                    <img src={`data:image/jpeg;base64,${detailsForBook.file}`}  alt="" className=" imgProfileBook rounded-circle"/>

                    <br/>

                    <span className="font-weight-bold font-italic  nameBook mt-5">{detailsForBook.name}</span>
                    <p className="font-weight-bold font-italic nameProfile ml-4 mt-2">{detailsForBook.price} denari</p>

                </div>
                <div className="col-md-8 mt-5">
                    <span className="font-italic float-left colorH font-weight-bold nameProfile">Short content of the book</span>
                    <br/>
                    <hr className="hrCostume"/>
                    <div className="float-left text-center">
                        {detailsForBook.shortContentBook}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default detailsBook;