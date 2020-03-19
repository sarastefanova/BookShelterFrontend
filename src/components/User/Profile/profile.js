import React, { Component } from "react";
import UserService from "../../../repository/axiosUserRepository";
import Img from "react-image";
import authorPhoto from "../../AllPhotos/authorImg.jpg";
import './profile.css'
import { Link } from "react-router-dom";
import avatar from "../../AllPhotos/avatar.jpg";
import AllBooksFavourite  from '../FavouriteBooks/AllFavouriteBooks/allFavouriteBooks'
class MyProfile extends Component{


    constructor(props){
        super(props);

        this.state={
            user:UserService.currentUserValue,
            detailsUser:[],
            photo:UserService.currentUserValue.file,
            roleAdmin:false

        };
    }

    componentDidMount() {

        UserService.getUserById(this.state.user.id).then((data)=>{
            this.setState(
                {
                    detailsUser:data.data
                }
            )
        });

        if (this.state.user!==null && this.state.user.roles!=null) {
            if (this.state.user.roles.role === 'admin') {
                this.setState({roleAdmin: true})
            }

        }
    }

    hideAvatarPhoto=()=>{
        let div=document.getElementById("imgAvatar");
        div.style.display="none";
    };

    render() {
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


                    <h4 className="font-weight-bold font-italic  nameBook mt-3">{this.state.user.name} {this.state.user.surname} </h4>

                    <span className="font-weight-bold font-italic mt-2">
                             <Link to={"/editUserImg/"+this.state.user.id}>
                                <span  className="linksProfile"> <i className="fa fa-edit "/>Edit my profile</span>
                            </Link>
                        <br/>
                        <Link to={"/allBooks"}><span className="linksProfile2">
                            <i className="fa fa-book"/>See more of our books!
                        </span></Link>
                        {this.state.roleAdmin &&
                        <Link to="/addBook">
                            <span  className="linksProfile3"> <i className="fa fa-book "/>Add new book</span>
                        </Link>
                        }
                        <br/>
                        {this.state.roleAdmin &&
                        <Link to="/addAuthor">
                            <span  className="linksProfile"> <i className="fa fa-user "/>Add new author</span>
                        </Link>
                        }

                        <br/>
                        { this.state.roleAdmin &&
                        <Link to="/allAuthors">
                            <span  className="linksProfile3"> <i className="fa fa-user-o "/>List all authors</span>
                        </Link>
                        }
                        <br/>

                </span>

                </div>
                <div className="col-md-8 mt-5">
                    <h3 className="font-italic float-left colorH font-weight-bold nameProfile">All my favourite books</h3>
                    <Link to={"/allOrderedBooks/"+this.state.user.id}>
                        <button  className="btnShoppingCart  float-lg-right" title="My shopping cart">  <i className="fa fa-shopping-cart "/></button>
                    </Link>
                    {this.state.roleAdmin &&
                    <Link to={"/allRequests"}>
                        <button  className="btnShoppingCart float-lg-right" title="All requests"> <i className="fa fa-book "/></button>
                    </Link>
                    }
                    <br/>
                    <hr className="hrCostume"/>
                    <div className="float-left text-center">
                            <AllBooksFavourite loadAllBooks={this.props.loadAllBooks} addOrder={this.props.addOrder} onDeleteBookFav={this.props.onDeleteBookFav} id={this.state.user.id} user={this.state.user}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
export default MyProfile;