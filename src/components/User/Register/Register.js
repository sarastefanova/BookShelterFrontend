import React, {Component} from "react";
import './registerStyle.css';
import UserService from '../../../repository/axiosUserRepository';
import {User} from '../../../model/user';
import PasswordStrength from './PasswordStrength/passwordStrength';
import PasswordInput from './PasswordInput/passwordInput'
class Register extends Component{

    // constructor(props) {
    //     super(props);
    //
    //     if (UserService.currentUserValue) {
    //         this.props.history.push('/');
    //     }
    //
    //
    //
    // }
    state = {
        user: new User('', '', ''),
        submitted: false,
        loading: false,
        errorMessage: '',

    };



    handleChange(e) {

        var {name, value} = e.target;
        var user = this.state.user;
        user[name] = value;
        // user["file"]=null;
        this.setState({user: user});

    }


    handleRegister(e) {
        e.preventDefault();
        this.setState({submitted: true});
        // user["file"]=null;

        const {user} = this.state;
        console.log(user);
        if (!(user.userName && user.password && user.name)) {
            return;
        }

        this.setState({loading: true});
        UserService.register(user).then(data => {
            this.props.history.push("/login");
        }, error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessage: "Username is not available",
                    loading: false
                });
            } else {
                this.setState({
                    errorMessage: "Unexpected error occurred.",
                    loading: false
                });
            }
        });
    }


    render() {
        const {user, submitted, loading, errorMessage} = this.state;
        return(
            <div className="container containerLogin ">
                <form onSubmit={(e) => this.handleRegister(e)}>
                    <h1 className="colorH ">Create new account</h1>
                    {errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! </strong> {errorMessage}
                    </div>
                    }

                    <div className={'form-group' + (submitted && !user.userName ? 'has-error' : '')}>
                        <label className="labelLogin" htmlFor={"userName"}>UserName</label>
                        <input type="text" name={"userName"} value={user.userName} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter userName" />
                        {submitted && !user.userName &&
                        <span className="help-block font-weight-bold">Username is required!</span>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.name ? 'has-error' : '')}>
                        <label className="labelLogin" htmlFor={"name"}>First name</label>
                        <input type="text" name={"name"} value={user.name} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter first name" />
                        {submitted && !user.name &&
                        <span className="help-block font-weight-bold">Name is required!</span>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.surname ? 'has-error' : '')}>
                        <label className="labelLogin4" htmlFor={"surname"}>Surname</label>
                        <input type="text" name={"surname"} value={user.surname} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter surname" />
                        {submitted && !user.surname &&
                        <span className="help-block font-weight-bold">Surname is required!</span>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.email ? 'has-error' : '')}>
                        <label className="labelLogin5" htmlFor={"email"}>Email</label>
                        <input type="email" name="email" value={user.email} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter email" />
                        {submitted && !user.email &&
                        <span className="help-block font-weight-bold">Email is required!</span>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.number ? 'has-error' : '')}>
                        <label className="labelLogin2" htmlFor={"number"}>Phone number</label>
                        <input name="number" value={user.number} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter phone number" />
                    </div>

                    <div className={'form-group' + (submitted && !user.address ? 'has-error' : '')}>
                        <label className="labelLogin2" htmlFor={"address"}>Home address</label>
                        <input type="text" name="address" value={user.address} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter address" />
                        {submitted && !user.address &&
                        <span className="help-block font-weight-bold">Address is required!</span>
                        }
                    </div>

                    {/*<div className={'form-group' + (submitted && !user.password ? 'has-error' : '')}>*/}
                    {/*    <label className="labelLogin4" htmlFor={"password"}>Password</label>*/}
                    {/*    <input type="password" name="password" value={user.password} onChange={(e) => this.handleChange(e)} className="form-control col-md-6" placeholder="Enter password" />*/}
                    {/*    {submitted && !user.password &&*/}
                    {/*    <span className="help-block font-weight-bold">Password is required!</span>*/}
                    {/*    }*/}
                    {/*</div>*/}
                    <PasswordInput value={user.password}
                                   name="password"
                    handleChange={(e) => this.handleChange(e)}/>



                    <div className="form-group mt-5">
                        <button className="btn btn-lg btn-primary btn-block col-md-6 form-submit-button"
                                disabled={loading}>Sign Up
                        </button>
                    </div>

                    <br/>
                    <br/>
                    <br/>

                </form>
            </div>

        );
    }
}

export default Register;