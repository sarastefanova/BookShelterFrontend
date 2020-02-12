import React, {Component} from "react";
import {Redirect} from "react-router";

class AddAuthorImg extends Component{
    state = {


        selectedFile:null,
        redirect: false

    }
    onFormSubmit = (e) => {

        e.preventDefault();

        // const newAuthor = {
        //     "nameAndSurname": e.target.nameAndSurname.value,
        //     "shortAuthorBiography": e.target.shortAuthorBiography.value
        // };

        const formData = new FormData();
        formData.append('nameAndSurname',e.target.nameAndSurname.value);
        formData.append('shortAuthorBiography',e.target.shortAuthorBiography.value);
        formData.append('file', this.state.selectedFile);
        // // console.log(newBook.get("name"));
        console.log(formData);
        console.log(this.state.selectedFile);
        this.props.onNewAuthorAddedImg(formData);
        this.setState({redirect:true});

    };

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let file=e.target.files[0];
        this.setState({selectedFile:file});

    };

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }
        return(
            <div className="container containerAddAuthor">
                <form onSubmit={this.onFormSubmit}>
                    <h1 className="colorH">Add new author</h1>
                    <div className="form-group files color">
                        <label className="bookAddLabel2">Upload Your File </label>
                        <input type="file" name={"file"} id="file" onChange={(event => this.onFileChangeHandler(event))} className="form-control col-md-6"/>
                    </div>
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
}
export default AddAuthorImg;