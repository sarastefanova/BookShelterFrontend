import React, {useState, useEffect, Component} from 'react'
import {useHistory} from 'react-router-dom';
import axios from "../../../cutom-axios/axios";
import './addBookStyle.css'

class BookAddImg extends Component{
    state = {
        authors: [],
        selectedTeam: "",
        selectedFile:null
    }


    componentDidMount() {
        axios.get(`http://localhost:8080/author`)

            .then(data => {
                let authorFromApi = data.data.map(author => {
                    return { value: author.nameAndSurname, display: author.nameAndSurname };
                });
                this.setState({
                    authors: [
                        {
                            value: "",
                            display:
                                "(Select your favourite team)"
                        }
                    ].concat(authorFromApi)
                });
            })
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let file=e.target.files[0];
        this.setState({selectedFile:file});

    };



    onFormSubmit = (e) => {

        e.preventDefault();

        // const newBook = {
        //     "name": e.target.name.value,
        //     "nameAndSurname":e.target.nameAndSurname.value,
        //     "price": e.target.price.value,
        //     "file":this.state.selectedFile,
        // };

        const formData = new FormData();
        formData.append('name',e.target.name.value);
        formData.append('nameAndSurname',e.target.nameAndSurname.value);
        formData.append('price',e.target.price.value);
        formData.append('file', this.state.selectedFile);
       // // console.log(newBook.get("name"));
        console.log(formData);
        console.log(this.state.selectedFile);
        this.props.onNewBookAddedWithImg(formData);




    };


render() {


    return (
        <div className="container containerAddBook">
            <form onSubmit={this.onFormSubmit} >
                <h1 className="colorH">Add new book</h1>
                <div className="form-group files color">
                    <label>Upload Your File </label>
                    <input type="file" name={"file"} id="file" onChange={(event => this.onFileChangeHandler(event))} className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="bookAddLabel1">Name</label>
                    <input name={"name"} id="name" type="text" className="form-control col-md-6"
                           placeholder="Enter book's name"/>
                </div>
                <div className="form-group">
                    <label className="bookAddLabel2">Choose author</label>
                    <select name={"nameAndSurname"} id="nameAndSurname"
                            value={this.state.selectedTeam}
                            onChange={e =>
                                this.setState({
                                    selectedTeam: e.target.value
                                })
                            }
                    >
                        {this.state.authors.map(team => (
                            <option
                                key={team.value}
                                value={team.value}
                            >
                                {team.display}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="form-group">
                    <label className="bookAddLabel3">Price</label>
                    <input name={"price"} id="price" type="text" className="form-control col-md-6"
                           placeholder="Enter price for the book"/>
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
}
};

export default BookAddImg;