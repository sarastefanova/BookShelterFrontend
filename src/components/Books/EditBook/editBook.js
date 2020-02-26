import React, {Component,useEffect, useState } from "react";
import './styleEditBook.css'
import axios from "../../../cutom-axios/axios";
import {Redirect, useHistory, useParams} from 'react-router-dom';
const BookEdit=(props)=>{
    const [allAuthors,setAllAuthors]=useState({});
     const [detailsBook,setDetailsBooks]=useState({});
    const [theAuthor,setTheAuthor]=useState({});
    const history = useHistory();
    const {name}=useParams();
    let flag=true;
   useEffect(()=>{

           axios.get("/books?name="+name).then((data)=>{
              setDetailsBooks(data.data)
           }),
               axios.get("/author").then((data)=>{
                   setAllAuthors(data.data)

               }),
                axios.get("/books/"+name+"/authorBook").then((data)=>{
                    setTheAuthor(data.data)
                })
               // axios.get("/author/getAuthorName",{
               //     headers: {'Content-Type': 'application/json'},
               //     body:detailsBook.author
               // }).then((data)=>{
               //     setTheAuthor(data.data)
               //
               // })

   },[]);


    const allAuthorsArray = Object.values(allAuthors);

    const allAuthorsFromApi = allAuthorsArray.map(author => {return {value: author.nameAndSurname, display: author.nameAndSurname}});


   // console.log(detailsBook.shortAuthorBiography);


    // const selectedAuthor=detailsBook.nameAndSurname;
   const onFormSubmit = (e) => {

        e.preventDefault();

        const newBook = {
            "name": name,
            "nameAndSurname":e.target.nameAndSurname.value,
            "price": e.target.price.value,
            "shortContentBook":e.target.shortContentBook.value,
            "availability":e.target.availability.value
        };

        // const formData = new FormData();
        // formData.append('name',e.target.name.value);
        // formData.append('nameAndSurname',e.target.nameAndSurname.value);
        // formData.append('price',e.target.price.value);
        // formData.append('shortContentBook',e.target.shortContentBook.value)
        // // console.log(newBook.get("name"));
       //console.log(detailsBook.nameAndSurname);
        //console.log(newBook);

        props.onEditedBook(newBook);

        history.push("/");

    };

    const handleTermOnChange  = (e) => {
        const paramName = e.target.name;
        const paramValue =  e.target.value;
        setDetailsBooks({[paramName]:paramValue});

    };
    let defaultAuthor=null;


        // if (Object.values(detailsBook).length > 0) {
        //     console.log(Object.values(detailsBook)[1].nameAndSurname);
        //     defaultAuthor=Object.values(detailsBook)[1].nameAndSurname;
        // }
    console.log(theAuthor.nameAndSurname);
    return (

        <div className="container containerAddBook">
            <form onSubmit={onFormSubmit} >
                <h1 className="colorH">Add new book</h1>

                <div className="form-group">
                    <label className="bookAddLabel1">Short content of the book</label>
                    <input required onChange={handleTermOnChange} value={detailsBook.shortContentBook} name={"shortContentBook"} id="shortContentBook" type="text" className="form-control col-md-6"
                           placeholder="Write something about the book"/>
                </div>
                <div className="form-group">
                    <label className="bookAddLabel2">Choose author</label>
                    <select value={theAuthor.nameAndSurname} onChange={handleTermOnChange} name={"nameAndSurname"} id="nameAndSurname" className="form-control col-md-6">{allAuthorsFromApi.map((author) => <option  key={author.value} value={author.value}>{author.display}</option>)}</select>
                </div>


                <div className="form-group">
                    <label className="bookAddLabel3">Price</label>
                    <input required onChange={handleTermOnChange} value={detailsBook.price} name={"price"} id="price" type="text" className="form-control col-md-6"
                           placeholder="Enter price for the book"/>
                </div>

                <div className="form-group">
                    <label className="bookAddLabel3">Quantity</label>
                    <input required onChange={handleTermOnChange} value={detailsBook.availability} name={"availability"} id="availability" type="number" className="form-control col-md-6"
                           placeholder="Enter quantity of the book"/>
                </div>

                <div className=" text-right">

                    <button  type="submit"  className="btn btnColor col-md-6 btn-block" title="AddBook">
                        <i className="fa fa-fw fa-save"></i> Edit book
                    </button>
                </div>
            </form>
            <br/>

        </div>
    )


}

export default BookEdit;