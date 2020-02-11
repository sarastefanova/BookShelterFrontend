import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import axios from "../../../cutom-axios/axios";
import './addBookStyle.css'

const bookAdd =(props)=>{
    const [allAuthors,setAllAuthors]=useState({});
    // const [booksPhoto,setBooksPhoto]=useState(null);
    const history = useHistory();
    useEffect(()=>{
        axios.get("/author").then((data)=>{
            setAllAuthors(data.data)

        })
    },[])


    const allAuthorsArray = Object.values(allAuthors);
    const allAuthorsFromApi = allAuthorsArray.map(author => {return {value: author.nameAndSurname, display: author.nameAndSurname}});
    //console.log(allAuthorsFromApi);
    // const history = useHistory();
   // console.log(props+"vhv");





    const onFormSubmit = (e) => {

        e.preventDefault();

        const newBook = {
            "name": e.target.name.value,
                "nameAndSurname":e.target.nameAndSurname.value,
                // "photoBook":{booksPhoto},
            "price": e.target.price.value
        };

        console.log(newBook);

        props.onNewBookAdded(newBook);


        history.push("/");

    };

    // const fileSelectHandler=(e)=>{
    //     setBooksPhoto(e.target.files[0].name);
    //      console.log(booksPhoto.name);
    //
    //     console.log(e.target.files[0].name)
    // }

    return(
        <div className="container containerAddBook">
            <form onSubmit={onFormSubmit}>
                <h1 className="colorH">Add new book</h1>
                {/*<div className="form-group files color">*/}
                {/*    <label>Upload Your File </label>*/}
                {/*    <input type="file" id="photoBook" name={"photoBook"} className="form-control col-md-6" onChange={fileSelectHandler} />*/}
                {/*</div>*/}
                <div className="form-group">
                    <label className="bookAddLabel1">Name</label>
                    <input name={"name"} id="name" type="text" className="form-control col-md-6" placeholder="Enter book's name" />
                </div>
                <div className="form-group">
                    <label className="bookAddLabel2">Choose author</label>
                    <select name={"nameAndSurname"} id="nameAndSurname" className="form-control col-md-6">{allAuthorsFromApi.map((author) => <option key={author.value} value={author.value}>{author.display}</option>)}</select>
                </div>


                <div className="form-group">
                    <label className="bookAddLabel3">Price</label>
                    <input name={"price"} id="price" type="text" className="form-control col-md-6" placeholder="Enter price for the book" />
                </div>

                <div className=" text-right">

                    <button type="submit" className="btn btnColor col-md-6 btn-block" title="AddBook">
                        <i className="fa fa-fw fa-save"></i> Add book
                    </button>
                </div>
            </form>
            <br/>

        </div>
    )

};

export default bookAdd;