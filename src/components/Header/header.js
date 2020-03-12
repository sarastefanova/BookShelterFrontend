import React from "react";
import { Link} from "react-router-dom";
import logo from '../AllPhotos/logo.png';
import './headerStyle.css';
import SearchFiled from "../SearchField/Search";
import UserService from '../../repository/axiosUserRepository';
import { useHistory} from 'react-router-dom';
const header=(props)=>{
    const history = useHistory();
   const logout=(e)=> {
       debugger;
        UserService.logOut().then(data => {
            debugger;
           history.push('/');
        }, error => {
            debugger;
            this.setState({

                errorMessage: "Unexpected error occurred."
            });
        });


    }

    return(

        <header>
            {!props.currentUser &&
                <nav className="navbar navbar-expand-lg bg-white fixed-top ">
                    <Link to={"/"} className="navbar-brand ml-4" href="#"><img className="logoPhoto" src={logo}
                                                                               alt="Logo"/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">

                        <div className="navbar-text ml-auto aligneOneLine">
                            <SearchFiled onSearch={props.onSearch}/>

                        </div>
                        <ul className="navbar-nav ml-auto mr-4">
                            <li className="nav-item active">
                                <Link to={"/register"} className="btn ColorBtn btn-primary mr-1">Create a profile</Link>
                                <Link to={"/login"} className="btn ColorBtn btn-primary">Log in</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            }
            {props.currentUser &&
            <nav className="navbar navbar-expand-lg bg-white fixed-top ">
                <Link to={"/"} className="navbar-brand ml-4" href="#"><img className="logoPhoto" src={logo}
                                                                           alt="Logo"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">

                    <div className="navbar-text ml-auto aligneOneLine">
                        <SearchFiled onSearch={props.onSearch}/>

                    </div>
                    <ul className="navbar-nav ml-auto mr-4">
                        <li className="nav-item active">
                            <Link to={"/myProfile"} className="btn ColorBtn btn-primary mr-1">My profile</Link>
                            <button  onClick={logout} className="btn ColorBtn btn-primary">Sing out</button>
                        </li>
                    </ul>
                </div>
            </nav>
            }
        </header>

    )
}

export default header;