import React,{useState,useEffect} from 'react'
import './styleEditAuthor.css'

const editAuthor = (props) =>{

    return(
        <div className="container containerEditAuthor">
                        <form >
                            <h1 className="colorH">Edit the author</h1>
                            <div className="form-group">
                                <label className="labelEditAuthor1">First and last name</label>
                                <input name="name" type="text" className="form-control col-md-6" />
                            </div>
                            <div className="form-group">
                                <label className="labelEditAuthor2">Short author biography</label>
                                <input name="shortAuthorBiography" type="text" className="form-control col-md-6" />
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

}
export default editAuthor;