import React, {Component} from 'react'
import { Redirect } from "react-router";
import axios from "../../../cutom-axios/axios";
import './addBookStyle.css'


class BookAddImg extends Component{
    state = {
        authors: [],
        selectedTeam: "",
        selectedFile:null,
        redirect: false,
        submitted: false,
        error:this.props.errorMsg,
        imagePreviewUrl:null,
        bookRedirect: this.props.bookRedirect
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
                                "(Select one author)"
                        }
                    ].concat(authorFromApi)
                });
            })
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let file=e.target.files[0];
        this.setState({selectedFile:file});

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(e.target.files[0])
    };



    onFormSubmit = (e) => {

        e.preventDefault();
        this.setState({submitted: true});
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
        formData.append('shortContentBook',e.target.shortContentBook.value)
       // // console.log(newBook.get("name"));
        console.log(formData);
        console.log(this.state.selectedFile);
        this.props.onNewBookAddedWithImg(formData);
        if(this.props.errorMsg){
            //debugger;
            this.setState({redirect:true});
        }

    };



render() {
    let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (this.state.imagePreviewUrl) {
        $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
    }
    // console.log(this.props.errorMsg);
    // const {submitted}=this.state;
    // let url = this.state.selectedFile && URL.createObjectURL(this.state.selectedFile);
    if (this.state.redirect) {
        //debugger;
        return <Redirect to='/'/>;
    }
    return (
        <div className="container containerAddBook">
            <form onSubmit={this.onFormSubmit} >
                <h1 className="colorH">Add new book</h1>
                { $imagePreview }
                <div className="form-group files color">
                    <label className="bookAddLabel2">Upload Your File </label>
                    <input required type="file" name={"file"} id="file" onChange={(event => this.onFileChangeHandler(event))} className="form-control col-md-6"/>
                </div>
                <div className="form-group">
                    {this.props.errorMsg && <div className="alert alert-danger errorMessage2 col-md-6"  role="alert">
                        <strong>Error! </strong> Username is already taken!
                    </div>}
                    <label className="bookAddLabel1">Name</label>
                    <input required name={"name"} id="name" type="text"   className="form-control col-md-6"
                           placeholder="Enter book's name"/>
                </div>
                <div className="form-group">
                    <label className="bookAddLabel4">Short content of the book</label>
                    <input required name={"shortContentBook"} id="shortContentBook" type="text" className="form-control col-md-6"
                           placeholder="Write something about the book"/>
                </div>
                <div className="form-group">
                    <label className="bookAddLabel2">Choose author</label>
                    <select name={"nameAndSurname"} id="nameAndSurname"
                            className="form-control col-md-6"
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
                    <input required name={"price"} id="price" type="number" className="form-control col-md-6"
                           placeholder="Enter price for the book"/>
                </div>

                <div className=" text-right">

                    <button  type="submit"  className="btn btnColor col-md-6 btn-block" title="AddBook">
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