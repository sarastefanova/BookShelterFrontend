import React,{useState,useEffect} from "react";
import axios from '../../../cutom-axios/axios'
import './detailsAuthorStyle.css'
import {useParams} from "react-router-dom";
import Img from "react-image";
import bookImg from "../../AllPhotos/books.png";
import authorPhoto from '../../AllPhotos/authorImg.jpg';
const detailsAuthor=(props)=>{
    const [detailsForAuthor,setDetailsAuthor]=useState({});
    const {nameAndSurname}=useParams();

    useEffect(()=>{
        axios.get("/author?nameAndSurname="+nameAndSurname).then((data)=>{
            setDetailsAuthor(data.data)
        })

    },[])



    return(
        <div className="container containerDetails">
            <div className="row mt-5">

                <div className="col-md-4 mt-5">
                    <Img alt="" src={authorPhoto} className="topPhoto rounded"/>
                    <img src={`data:image/jpeg;base64,${detailsForAuthor.file}`}  alt="" className=" imgProfile rounded-circle"/>

                    <br/>

                    <p className="font-weight-bold font-italic nameProfile ml-4 mt-3">{detailsForAuthor.nameAndSurname}</p>

                </div>
                <div className="col-md-8 mt-5">
                    <span className="font-italic float-left colorH font-weight-bold nameProfile">Short biography about the author</span>
                    <br/>
                    <hr className="hrCostume"/>
                    <div className="float-left text-center">
                        {detailsForAuthor.shortAuthorBiography}
                    </div>
                </div>
            </div>
        </div>
    )


}
export default detailsAuthor;