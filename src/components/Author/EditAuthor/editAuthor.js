import React,{useState,useEffect} from 'react'
import './styleEditAuthor.css'
import {useHistory, useParams} from "react-router";
import AuthorService from "../../../repository/axiosAuthorRepository";

const editAuthor = (props) =>{
    const [detailsAuthor,setDetailsAuthor]=useState({});
    const history = useHistory();
    const {nameAndSurname}=useParams();

    useEffect(()=>{

        AuthorService.getAuthorById(nameAndSurname).then((data)=>{
            setDetailsAuthor(data.data)
        })
    },[]);

    const onFormSubmit = (e) => {

        e.preventDefault();

        const newAuthor = {

            "nameAndSurname":nameAndSurname,
            "shortAuthorBiography": e.target.shortAuthorBiography.value,
        };

        console.log(newAuthor);
        props.onEditedAuthor(newAuthor);

        history.push("/");

    };


    const handleTermOnChange  = (e) => {
        const paramName = e.target.name;
        const paramValue =  e.target.value;
        setDetailsAuthor({[paramName]:paramValue});
    };

    return(
        <div className="container containerEditAuthor">
                        <form onSubmit={onFormSubmit}>
                            <h1 className="colorH">Edit the author</h1>

                            <div className="form-group">
                                <label className="labelEditAuthor2">Short author biography</label>
                                <textarea required value={detailsAuthor.shortAuthorBiography} name="shortAuthorBiography" onChange={handleTermOnChange} id="shortAuthorBiography" cols="5" rows="5" className="form-control col-md-6" />
                            </div>

                            <div className=" text-right">

                                <button type="submit" className="btn btnColor col-md-6 btn-block" title="EditAuthor">
                                    <i className="fa fa-fw fa-save"></i> Edit author
                                </button>
                            </div>
                        </form>
            <br/>

        </div>
    )
};
export default editAuthor;