import React, {Component} from "react";
import {Link} from "react-router-dom"
import './OneGridBookStyle.css'
import Confirm from './Confirm';
import axios from '../../../cutom-axios/axios';
import HeartButton from "./HeartButton";
import random from "lodash/random";
import OneBookFavourite from "../../User/FavouriteBooks/OneFavouriteBook/oneFavouriteBook";
import {contains} from "jquery";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import UserService from "../../../repository/axiosUserRepository";
class OneGridBook extends Component{

    state ={
        url: "",
        color: "#cc0044",
        isClicked: false,
        userHasTheBook: null,
        flagIndex: 6,
        getAllFavBooksUser:{},
        user:UserService.currentUserValue,
        roleAdmin:false,
        text:null,
        isOrdered:""
    }




    componentDidMount() {
       // debugger;

            // axios.get("/user/getAllFavouriteBooksUser/"+this.props.id).then((result)=>{
            //     // debugger;
            //     this.setState({
            //         getAllFavBooksUser:result.data
            //     })
            // })
        // axios.get("/books/getInFavouritesBook/"+this.props.id+"/"+this.props.book.name).then((response)=>{
        //    // console.log(response.data+" pom");
        //     this.setState({text:response.data})
        // })


        if (this.state.user!==null){
            if(this.state.user.roles.role==='admin'){
                this.setState({roleAdmin:true})
            }

        }



      //  this.setHasTheBook();

    }





    addFavourite=(e)=>{
        //console.log(this.props);
       // this.setState({color:'yellow',isClicked:true})
        this.setState({isClicked:!this.state.isClicked});
        // if(this.state.isClicked){
        //     this.setState({color:'yellow'})
        //     debugger;
        // }
        debugger;
        this.props.addFavourite(this.props.bookName,this.props.page)



    }





    render() {

       //  console.log((this.state.getAllFavBooksUser))

       //   const  pom=Object.values(this.props.getAllFavBooksUser).map((book)=>book.name===this.props.bookName);
       //  const hasBook=pom.filter(p=>p===true).length;
       //  console.log(hasBook);
       //  if(this.state.text===1){
       //      oneBookTermFavUser=  (
       //          <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
       //              <i className="fa fa-heart favouriteHeart " style={{color:"yellow"}}/>
       //          </button>
       //      )
       //  } if(this.state.text===0){
       //      oneBookTermFavUser=  (
       //          <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
       //              <i className="fa fa-heart favouriteHeart " style={{color:this.state.color}}/>
       //          </button>
       //      )
       //  }
       //  let  pom=this.state.isOrdered;
       //  if(this.state.text===1){
       //      pom=1;
       //  }
       //  console.log(this.state.text);
    //   console.log(this.props.inFavourite);

        return(





            <div className={this.props.colClass}>
                <div className="card ">
                    <div className="book">
                        {this.cardHeader()}
                        {this.Example()}
                        {/*{this.Example()}*/}

                        {this.cardFooter()}

                    </div>
                </div>
            </div>
        )

    }

    Example = (pom) => {

            return(
                <div>
                    {
                        this.state.user!==null &&
                        <Link to={"/detailsBook/"+this.props.book.name}>
                            <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className="card-img-top imgWidthAndHeight"/>
                        </Link>
                    }
                    {this.state.user===null &&
                            <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className="card-img-top imgWidthAndHeight"/>
                    }

                    {/*{this.state.user!==null &&*/}
                    {/*this.state.isClicked*/}
                    {/*&&*/}
                    {/*<button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">*/}
                    {/*    <i className="fa fa-heart favouriteHeart " style={{color: "#cc0044"}}/>*/}
                    {/*</button>*/}
                    {/*}*/}

                    {this.state.user!==null &&
                    this.props.inFavourite===0 &&

                        <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
                        <i className="fa fa-heart-o favouriteHeart " style={{color: "#cc0044"}}/>
                        </button>

                    }

                    {this.state.user!==null &&
                    this.props.inFavourite===0 &&

                    <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
                        <i className="fa fa-heart-o favouriteHeart " style={{color: "#cc0044"}}/>
                    </button>

                    }

                    {/*{this.state.user!==null &&*/}
                    {/*pom===1*/}
                    {/*&&*/}
                    {/*<button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">*/}
                    {/*    <i className="fa fa-heart favouriteHeart " style={{color: "#cc0044"}}/>*/}
                    {/*</button>*/}
                    {/*}*/}



                    {this.state.user!==null &&
                    this.props.inFavourite===1 &&
                    <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
                        <i className="fa fa-heart favouriteHeart " style={{color: "#cc0044"}}/>
                    </button>

                    }

                </div>
            )
    }

    cardHeader(){

        return (<div className="card-header cardOneBookHeader">
            <div className="row">
                <div className="col-md-6 font-weight-bold font-italic headerText">
                    <span className="fontNameBook">{this.props.book.name}</span>
                </div>


                <div className="col-md-6 text-right ">
                    {this.state.roleAdmin &&
                        <Link to={"/editBook/" + this.props.book.name} title="Edit"
                              className="btn btn-default roundedLinksBooks"><i className="fa fa-pencil"/></Link>
                    }

                    {this.state.roleAdmin &&
                        <Confirm onDelete={this.props.onDelete} bookName={this.props.bookName}/>
                    }



                </div>
            </div>
        </div>);
    }





    cardFooter(){
        return(
            <div className="card-footer">
                <div className="row">
                    <div className="col-md-12 ">
                        {this.state.user!==null &&
                            <span className="colorH  float-left"><i className="fa fa-book"/> <Link
                                to={"/detailsAuthor/" + this.props.book.author.nameAndSurname}><span className="colorH">Written by {this.props.book.author.nameAndSurname}</span></Link></span>
                        }
                        {this.state.user===null &&
                        <span className="colorH  float-left"><i className="fa fa-book"/><span className="colorH">Written by {this.props.book.author.nameAndSurname}</span></span>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default OneGridBook;