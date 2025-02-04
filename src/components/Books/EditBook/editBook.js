import React, { useEffect, useState } from "react";
import './styleEditBook.css'
import { useHistory, useParams } from 'react-router-dom';
import BookService from "../../../repository/axiosBookRepository";
import AuthorService from "../../../repository/axiosAuthorRepository";
const BookEdit=(props)=>{
    const [allAuthors,setAllAuthors]=useState({});
     const [detailsBook,setDetailsBooks]=useState({});
    const [theAuthor,setTheAuthor]=useState({});
    const history = useHistory();
    const {name}=useParams();

   useEffect(()=>{

           BookService.getBookById(name).then((data)=>{
              setDetailsBooks(data.data)
           });
               AuthorService.getAllAuthors().then((data)=>{
                   setAllAuthors(data.data)
               });
               BookService.getAuthorBook(name).then((data)=>{
                    setTheAuthor(data.data)
                })


   },[]);

    const allAuthorsArray = Object.values(allAuthors);

    const allAuthorsFromApi = allAuthorsArray.map(author => {return {value: author.nameAndSurname, display: author.nameAndSurname}});

   const onFormSubmit = (e) => {

        e.preventDefault();

        const newBook = {
            "name": name,
            "nameAndSurname":e.target.nameAndSurname.value,
            "price": e.target.price.value,
            "shortContentBook":e.target.shortContentBook.value,
            "availability":e.target.availability.value
        };


        props.onEditedBook(newBook);

        history.push("/");

    };

    const handleTermOnChange  = (e) => {
        const paramName = e.target.name;
        const paramValue =  e.target.value;
        setDetailsBooks({[paramName]:paramValue});

    };

    const handleTermOnChangeAuthor = (e) =>{
        setDetailsBooks({nameAndSurname: e.target.value});
        setTheAuthor(e.target.value);
    };

    return (

        <div className="container containerAddBook">
            <form onSubmit={onFormSubmit} >
                <h1 className="colorH">Edit book</h1>

                <div className="form-group">
                    <label className="bookEditLabel1">Short content of the book</label>
                    <textarea cols="5" rows="5" required onChange={handleTermOnChange} value={detailsBook.shortContentBook} name={"shortContentBook"} id="shortContentBook" type="text" className="form-control col-md-6"
                           placeholder="Write something about the book"/>
                </div>
                <div className="form-group">
                    <label className="bookEditLabel2">Choose author</label>
                    <select  value={theAuthor.nameAndSurname} onChange={handleTermOnChangeAuthor} name={"nameAndSurname"} id="nameAndSurname" className="form-control col-md-6">{allAuthorsFromApi.map(author => <option defaultValue={theAuthor.nameAndSurname}  key={author.value} value={author.value}>{author.display}</option>)}</select>
                </div>


                <div className="form-group">
                    <label className="bookEditLabel3">Price</label>
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
};

export default BookEdit;