import React, { Component } from "react";
import './styleLogin.css'
class LogIn extends Component{

    render() {
        return(
            <div className="container containerLogin">
                <form>
                    <h1 className="colorH">My account</h1>

                    <h3  className="colorH">Login</h3>
                    <div className="form-group">
                        <label className="labelLogin">UserName</label>
                        <input name="userName" type="text" className="form-control col-md-6" placeholder="Enter userName" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin">Password</label>
                        <input name="password" type="password" className="form-control col-md-6" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="rememberMe  custom-control custom-checkbox ">
                            <input name="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className=" custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btnColor col-md-6 btn-block">Submit</button>
                    <button type="submit" className="btn btnColor col-md-6 btn-block">Forgot password?</button>
                    <br/>
                    <br/>
                    <br/>

                </form>
            </div>

        );
    }
}

export default LogIn;