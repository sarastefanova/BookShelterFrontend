import React, {Component, useEffect, useState} from "react";
import UserService from "../../../repository/axiosUserRepository";
import Img from "react-image";
import authorPhoto from "../../AllPhotos/authorImg.jpg";
import './profile.css'
import {Link} from "react-router-dom";
import {User} from '../../../model/user';
import axios from "../../../cutom-axios/axios";
import avatar from "../../AllPhotos/avatar.jpg";
import AllBooksFavourite  from '../FavouriteBooks/AllFavouriteBooks/allFavouriteBooks'
class MyProfile extends Component{


    constructor(props){
        super(props);

        this.state={
            user:UserService.currentUserValue,
            detailsUser:[],
            photo:UserService.currentUserValue.file

        };
    }

    componentDidMount() {
      // this.setState({
      //     user:this.state.user
      // })
        const user=this.state.user;
        //debugger;

        axios.get("/user?id="+this.state.user.id).then((data)=>{
            this.setState(
                {
                    detailsUser:data.data
                }
            )
        });

        // this.setState({
        //     photo:avatar
        // })
    }

    // submitPhoto=()=>{
    //     this.setState({
    //
    //     })
    // }

    hideAvatarPhoto=()=>{
        let div=document.getElementById("imgAvatar");
        div.style.display="none";
    }

    // onDelete(name){
    //     console.log(name)
    //     axios.delete("/user/deleteFavBookUser/"+this.state.detailsUser.id+"?name="+name).then((response)=>{
    //         console.log("delete book");
    //     })
    // }


    render() {
        console.log((this.state.detailsUser));
        //console.log(this.state.user.userName)
       // const {currentUser}=JSON.parse(this.state.user);
        let $imgProfie;
        if(this.state.detailsUser.file!=null){
            this.hideAvatarPhoto();
            $imgProfie=(  <img src={`data:image/jpeg;base64,${this.state.detailsUser.file}`}  alt="" className=" imgProfileAvatar rounded-circle"/>);
        }
    return(



        <div className="container containerDetails">
            <div className="row mt-5">

                <div className="col-md-4 mt-5">
                    <Img alt="" src={authorPhoto} className="topPhoto rounded"/>
                    {$imgProfie}
                    <img src={avatar} id={"imgAvatar"} alt="" className=" imgProfileAvatar rounded-circle"/>
                    <br/>

                    <span className="font-weight-bold font-italic  nameBook mt-5">{this.state.user.name} {this.state.user.surname} </span>
                    <br/>
                    <span className="font-weight-bold font-italic ">
                    {/*<Link to={"/editUser/"+this.state.detailsUser.id}>*/}
                    {/*    <i className="fa fa-edit"/>Edit my profile*/}
                    {/*</Link>*/}
                        <Link to={"/editUserImg/"+this.state.user.id}>
                            <span  className="linksProfile"> <i className="fa fa-edit "/>Edit my profile</span>
                        </Link>
                        <br/>
                        <Link to="/addBook">
                            <span  className="linksProfile"> <i className="fa fa-edit "/>Add new book</span>
                        </Link>
                        <br/>
                        <Link to="/addAuthor">
                            <span  className="linksProfile"> <i className="fa fa-edit "/>Add new author</span>
                        </Link>
                        <br/>
                        <Link to="/allBooks">
                            <span  className="linksProfile"> <i className="fa fa-edit "/>List all books</span>
                        </Link>
                        <br/>
                        <Link to="/allAuthors">
                            <span  className="linksProfile"> <i className="fa fa-edit "/>List all authors</span>
                        </Link>

                </span>



                </div>
                <div className="col-md-8 mt-5">
                    <span className="font-italic float-left colorH font-weight-bold nameProfile">All the favourite books of {this.state.detailsUser.username}</span>
                    <Link to={"/allOrderedBooks/"+this.state.user.id}>
                        <button  className="btnShoppingCart  float-lg-right" title="My shopping cart">  <i className="fa fa-shopping-cart "/></button>
                    </Link>
                    <Link to={"/allRequests"}>
                        <button  className="btnShoppingCart float-lg-right" title="All requests"> <i className="fa fa-book "/></button>
                    </Link>
                    <br/>
                    <hr className="hrCostume"/>
                    <div className="float-left text-center">
                            <AllBooksFavourite addOrder={this.props.addOrder} onDeleteBookFav={this.props.onDeleteBookFav} id={this.state.user.id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
export default MyProfile;