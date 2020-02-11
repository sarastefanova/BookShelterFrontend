import React,{useState,useEffect} from 'react'
import './EditUser.css'

const editUser = (props) =>{

    return(
        <div className="container containerEditUser">
                        <form>
                            <h1 className="colorH">Edit this user</h1>

                            <div className="form-group">
                                <label className="labelLogin">First name</label>
                                <input type="text" name="name" className="form-control col-md-6"/>
                            </div>

                            <div className="form-group">
                                <label className="labelLogin4">Surname</label>
                                <input type="text" name="surName" className="form-control col-md-6"/>
                            </div>

                            <div className="form-group">
                                <label className="labelLogin5">Email</label>
                                <input type="email" name="email" className="form-control col-md-6" />
                            </div>

                            <div className="form-group">
                                <label className="labelLogin2">Phone number</label>
                                <input name="number" className="form-control col-md-6"  />
                            </div>

                            <div className="form-group">
                                <label className="labelLogin2">Home address</label>
                                <input type="text" name="address" className="form-control col-md-6" />
                            </div>

                            <div className="form-group">
                                <label className="labelLogin4">Password</label>
                                <input type="password" name="password" className="form-control col-md-6" />
                            </div>

                            <div className="form-group">
                                <label className="labelLogin3">Confirm password</label>
                                <input type="password" name="confirmPassword" className="form-control col-md-6" />
                            </div>

                            <button type="submit" className="btn btnColor col-md-6 btn-block">Edit</button>

                            <br/>
                            <br/>
                            <br/>

                        </form>

            <br/>

        </div>
    )

}
export default editUser;