import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import logo from '../AllPhotos/logo.png';
import './headerStyle.css';
import SearchFiled from "../SearchField/Search";
const header=(props)=>{
    return(
        <header>
            <nav className="navbar navbar-expand-lg bg-white fixed-top ">
                <a className="navbar-brand ml-4" href="#"><img className="logoPhoto" src={logo} alt="Logo" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">

                    <div className="navbar-text ml-auto aligneOneLine">
                        <SearchFiled/>

                        </div>
                    <ul className="navbar-nav ml-auto mr-4">
                        <li className="nav-item active">
                            <a className="btn ColorBtn btn-primary mr-1">Create a profile</a>
                            <a className="btn ColorBtn btn-primary">Sign in</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

    )
}

export default header;