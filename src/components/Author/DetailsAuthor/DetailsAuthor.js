import React,{useState,useEffect} from "react";
import './detailsAuthorStyle.css'
import { useParams} from "react-router-dom";
import Img from "react-image";
import authorPhoto from '../../AllPhotos/authorImg.jpg';
import CarouselAuthor from './Carousel/carousel';
import AuthorService from "../../../repository/axiosAuthorRepository";
import BookService from "../../../repository/axiosBookRepository";
const detailsAuthor=(props)=>{
    const [detailsForAuthor,setDetailsAuthor]=useState({});
    const [allBooksAuthor,setAllBooksAuthor]=useState({});
    const {nameAndSurname}=useParams();

    useEffect(()=>{
        AuthorService.getAuthorById(nameAndSurname).then((data)=>{
            setDetailsAuthor(data.data)
        });
            BookService.getAllBooksByAuthor(nameAndSurname).then((data)=>{
                setAllBooksAuthor(data.data)
            })

    },[]);



    const lengthAllBooksAuthor=Object.values(allBooksAuthor).length;
    return(

        <div className="container containerDetailsAuthor">
            <div className="row mt-5">

                <div className="col-md-4 mt-5">
                    <Img alt="" src={authorPhoto} className="topPhoto rounded"/>
                    <img src={`data:image/jpeg;base64,${detailsForAuthor.file}`}  alt="" className=" imgProfileAuthor rounded-circle"/>
                    <br/>
                </div>
                <div className="col-md-8 mt-5">
                    <span className="font-italic float-left colorH font-weight-bold nameProfile">Short biography about {detailsForAuthor.nameAndSurname}</span>
                    <br/>
                    <hr className="hrCostume"/>
                    <div className="float-left text-justify">
                        {detailsForAuthor.shortAuthorBiography}
                    </div>
                </div>
            </div>
            <h4 className="colorH font-italic">All the books of {detailsForAuthor.nameAndSurname}</h4>
            <hr/>
            <div className="row mt-3">
                {
                    lengthAllBooksAuthor!==0 &&
                    <CarouselAuthor nameAndSurname={nameAndSurname}/>
                }
            </div>
        </div>
    )


}
export default detailsAuthor;