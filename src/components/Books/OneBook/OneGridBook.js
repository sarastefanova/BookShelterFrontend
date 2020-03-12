import React, {Component} from "react";
import {Link} from "react-router-dom"
import './OneGridBookStyle.css'
import Confirm from './Confirm';
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


        if (this.state.user!==null){
            if(this.state.user.roles.role==='admin'){
                this.setState({roleAdmin:true})
            }

        }


    }





    addFavourite=(e)=>{

        this.setState({isClicked:true},() => this.setState({isClicked: false}));

        debugger;
        this.props.addFavourite(this.props.bookName,this.props.page)



    }





    render() {
        console.log(this.state.isClicked);
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




                    {this.state.user!==null &&
                    this.props.inFavourite===1 &&
                    <button onClick={this.addFavourite}  className={"btn favourite"} title="Favourite">
                        <i className="fa fa-heart favouriteHeart " style={{color: "#cc0044"}}/>
                    </button>

                    }



                    {this.state.user!==null &&
                    this.props.inFavourite===0 &&

                        <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
                        <i className="fa fa-heart-o favouriteHeart " style={{color: "#cc0044"}}/>
                        </button>

                    }

                    {
                        this.state.isClicked &&
                        <button onClick={this.addFavourite} className={"btn favourite"} title="Favourite">
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