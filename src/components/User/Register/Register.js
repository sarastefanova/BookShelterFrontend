import React, {Component} from "react";
import './registerStyle.css'
class Register extends Component{

    render() {
        return(
            <div className="container containerLogin ">
                <form>
                    <h1 className="colorH ">Create new account</h1>


                    <div className="form-group">
                        <label className="labelLogin">UserName</label>
                        <input type="text" name="userName" className="form-control col-md-6" placeholder="Enter userName" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin">First name</label>
                        <input type="text" name="name" className="form-control col-md-6" placeholder="Enter first name" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin4">Surname</label>
                        <input type="text" name="surName" className="form-control col-md-6" placeholder="Enter surname" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin5">Email</label>
                        <input type="email" name="email" className="form-control col-md-6" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin2">Phone number</label>
                        <input name="number" className="form-control col-md-6" placeholder="Enter phone number" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin2">Home address</label>
                        <input type="text" name="address" className="form-control col-md-6" placeholder="Enter address" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin4">Password</label>
                        <input type="password" name="password" className="form-control col-md-6" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin3">Confirm password</label>
                        <input type="password" name="confirmPassword" className="form-control col-md-6" placeholder="Confirm your password" />
                    </div>

                    <button type="submit" className="btn btnColor col-md-6 btn-block">Register</button>

                    <br/>
                    <br/>
                    <br/>

                </form>
            </div>

        );
    }
}

export default Register;