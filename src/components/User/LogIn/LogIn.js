import React, { Component } from "react";
import './styleLogin.css';
import UserService from '../../../repository/axiosUserRepository';
import {User} from '../../../model/user';
class LogIn extends Component{

    state = {
        user: new User('', ''),
        submitted: false,
        loading: false,
        errorMessage: '',

    };


    handleChange(e) {
        let {name, value} = e.target;
        let user = this.state.user;
        user[name] = value;
        this.setState({user: user});
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;

        if(!(user.userName && user.password)){
            return;
        }

        this.setState({loading: true});
        console.log(user);
        UserService.login(user).then( (response) => {
            debugger;
            this.props.history.push("/");
            debugger;
        }, error => {
            debugger;
            this.setState({
                errorMessage: "Username or password is not valid",
                loading: false
            });
            console.log(this.state.user)
        });
    }

    render() {
        const {user, submitted, loading, errorMessage} = this.state;

        return(
            <div className="container containerLogin">
                <form onSubmit={(e) => this.handleLogin(e)}>
                    <h1 className="colorH">My account</h1>

                    <h3  className="colorH">Login</h3>
                    {errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! </strong> {errorMessage}
                    </div>
                    }
                    <div className={'form-group' + (submitted && !user.userName ? 'has-error':'')}>
                        <label className="labelLogin" htmlFor={"userName"}>UserName</label>
                        <input name={"userName"} type="text" value={user.userName} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter userName" />
                        {submitted && !user.userName &&
                        <span className="help-block col-md-6 font-weight-bold">Username is required!</span>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.password ? 'has-error':'')}>
                        <label className="labelLogin" htmlFor={"password"}>Password</label>
                        <input name={"password"} type="password" value={user.password} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter password" />
                        {submitted && !user.password &&
                        <span className="help-block col-md-6 font-weight-bold">Password is required!</span>
                        }
                    </div>

                    <div className="form-group">
                        <div className="rememberMe  custom-control custom-checkbox ">
                            <input name="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className=" custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btnColor col-md-6 btn-block" disabled={loading}>Submit</button>
                    <br/>
                    <br/>
                    <br/>

                </form>
            </div>

        );
    }
}

export default LogIn;