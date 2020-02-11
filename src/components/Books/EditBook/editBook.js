import React from "react";
import './styleEditBook.css'
const bookEdit=(props)=>{


    return(
        <div className="container containerEditBook">
            <form >
                <h1 className="colorH">Edit this book</h1>
                <div className="form-group">
                    <label className="bookEditLabel1">Name</label>
                    <input name="name" type="text" className="form-control col-md-6" />
                </div>
                <div className="form-group">
                    <label className="bookEditLabel2">Choose author</label>
                    <input name="author" type="text" className="form-control col-md-6"/>
                </div>

                <div className="form-group">
                    <label className="bookEditLabel3">Price</label>
                    <input name="shortAuthorBiography" type="number" className="form-control col-md-6" />
                </div>

                <div className=" text-right">

                    <button type="submit" className="btn btnColor col-md-6 btn-block" title="EditBook">
                        <i className="fa fa-fw fa-save"></i> Edit book
                    </button>
                </div>
            </form>
            <br/>

        </div>
    )
}

export default bookEdit;