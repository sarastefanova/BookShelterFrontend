import React from "react";
import './styleAuthor.css';
import { useHistory} from 'react-router-dom';
const authorAdd=(props)=>{

    const history = useHistory();
    const onFormSubmit = (e) => {

        e.preventDefault();

        const newAuthor = {
            "nameAndSurname": e.target.nameAndSurname.value,
            "shortAuthorBiography": e.target.shortAuthorBiography.value
        };
        console.log(newAuthor);
        props.onNewAuthorAdded(newAuthor);


        history.push("/");

    };


    return(
        <div className="container containerAddAuthor">
                        <form onSubmit={onFormSubmit}>
                            <h1 className="colorH">Add new author</h1>
                            <div className="form-group">
                                <label className="labelAuthor1">First and last name</label>
                                <input name={"nameAndSurname"} id="nameAndSurname" type="text" className="form-control col-md-6" placeholder="Enter author's first name and last name" />
                            </div>
                            <div className="form-group">
                                <label className="labelAuthor2">Short author biography</label>
                                <input name={"shortAuthorBiography"} id="shortAuthorBiography" type="text" className="form-control col-md-6" placeholder="Enter short author biography" />
                            </div>

                            <div className=" text-right">

                                <button type="submit" className="btn btnColor col-md-6 btn-block" title="AddAuthor">
                                    <i className="fa fa-fw fa-save"></i> Add author
                                </button>
                            </div>
                        </form>
            <br/>

        </div>
    )
}

export default authorAdd;