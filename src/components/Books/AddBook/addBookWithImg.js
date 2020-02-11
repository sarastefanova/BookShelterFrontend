import React, {Component} from 'react'
import './addBookStyle.css';


class BookAdd extends  Component{
    state = {
        authors: [],
        selectedTeam: "",
        validationError: "",
        selectedFile:""
    };

    componentDidMount() {
        fetch(
            "http://localhost:8080/author"
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                let authorFromApi = data.map(author => {
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
            .catch(error => {
                console.log(error);
            });
    }


    onFileChangeHandler = (e) => {
        // e.preventDefault();
        // this.setState({
        //     selectedFile: e.target.files[0]
        // });


    };

    onFormSubmit=(e)=>{
        const formData = new FormData();
        formData.append('name',e.target.name.value);
        formData.append('nameAndSurname',e.target.nameAndSurname.value);
        formData.append('price',e.target.price.value);
        formData.append('photoBook', e.target.files[0]);
        // // const newBook = {
        // //     "name": e.target.name.value,
        // //     "nameAndSurname":e.target.nameAndSurname.value,
        // //     "price": e.target.price.value,
        // //     "photoBook":this.state.selectedFile
        // // };
        // // console.log(newBook);
        this.props.onNewBookAddedWithImg(formData);

    }
render() {
    return(
        <div className="container containerAddBook">
            <form onSubmit={this.onFormSubmit}>
                <h1 className="colorH">Add new book</h1>
                <div className="form-group files color">
                    <label>Upload Your File </label>
                    <input type="file" id="photoBook" name={"photoBook"} className="form-control col-md-6" onChange={this.onFileChangeHandler}/>
                </div>
                <div className="form-group">
                    <label className="bookAddLabel1">Name</label>
                    <input name={"name"} id="name" type="text" className="form-control col-md-6" placeholder="Enter book's name" />
                </div>
                <div className="form-group">
                    <label className="bookAddLabel2">Choose author</label>
                    <select name={"nameAndSurname"} id="nameAndSurname"
                        value={this.state.selectedTeam}
                        onChange={e =>
                            this.setState({
                                selectedTeam: e.target.value,
                                validationError:
                                    e.target.value === ""
                                        ? "You must select your favourite team"
                                        : ""
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
                    <div
                        style={{
                            color: "red",
                            marginTop: "5px"
                        }}
                    >
                        {this.state.validationError}
                    </div>
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
}

};

export default BookAdd;