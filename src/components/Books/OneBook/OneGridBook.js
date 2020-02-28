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
class OneGridBook extends Component{

    state ={
        url: "",
        color: "",
        isClicked: false,
        userHasTheBook: null,
        flagIndex: 6,
        getAllFavBooksUser:{}
    }




    componentDidMount() {
       // debugger;

            axios.get("/user/getAllFavouriteBooksUser/"+this.props.id).then((result)=>{
                // debugger;
                this.setState({
                    getAllFavBooksUser:result.data
                })
            })



      //  this.setHasTheBook();

    }



    addFavourite=(e)=>{
        //console.log(this.props);
        this.setState({color:'yellow',isClicked:true})
        this.props.addFavourite(this.props.bookName)


    }






    render() {

       //  console.log((this.state.getAllFavBooksUser))
         let {oneBookTermFavUser}="";
         const  pom=Object.values(this.state.getAllFavBooksUser).map((book)=>book.name===this.props.bookName);
        const hasBook=pom.filter(p=>p===true).length;
        console.log(hasBook);
        if(hasBook!==0){
            oneBookTermFavUser=  (
                <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
                    <i className="fa fa-heart favouriteHeart " style={{color:"yellow"}}/>
                </button>
            )
        }else {
            oneBookTermFavUser=  (
                <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
                    <i className="fa fa-heart favouriteHeart " style={{color:"red"}}/>
                </button>
            )
        }


        // else{
        //     oneBookTermFavUser=  (
        //         <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
        //             <i className="fa fa-heart favouriteHeart " style={{color:"red"}}/>
        //         </button>
        //     )
        // }


       // const oneBookTermFavUser=this.state.getAllFavBooksUser.map((book)=>{
       //     console.log(book)
       //      if(book.name===this.props.bookName){
       //
       //
       //      } else if(book.name!==this.props.bookName){
       //
       //          return (
       //              <button  onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
       //                  <i className="fa fa-heart favouriteHeart " style={{color:"red"}}/>
       //              </button>
       //          )
       //      }
       //  });



        return(

            <div className={this.props.colClass}>
                <div className="card ">
                    <div className="book">
                        {this.cardHeader()}
                        {this.Example(oneBookTermFavUser)}

                        {this.cardFooter()}

                    </div>
                </div>
            </div>
        )

    }

    Example = (oneBookTermFavUser) => {

            return(
                <div>
                    <Link to={"/detailsBook/"+this.props.book.name}>
                        <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className="card-img-top imgWidthAndHeight"/>

                    </Link>
                    {oneBookTermFavUser}
                    {/*<button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">*/}
                    {/*    <i className="fa fa-heart favouriteHeart " style={{color:pom}}/>*/}
                    {/*</button>*/}
                    {/*<HeartButton id={this.props.id} bookName={this.props.bookName}/>*/}
                </div>
            )
    }

    cardHeader(){

        return (<div className="card-header">
            <div className="row">
                <div className="col-md-6 font-weight-bold font-italic headerText">
                    <span className="fontNameBook">{this.props.book.name}</span>
                </div>
                {/*<div className="headerText">*/}
                {/*    {this.props.book.name}*/}
                {/*</div>*/}

                <div className="col-md-6 text-right ">

                    <Link to={"/editBook/"+this.props.book.name}  title="Edit" className="btn btn-default roundedLinksBooks" ><i className="fa fa-pencil"/></Link>
                    <Confirm onDelete={this.props.onDelete} bookName={this.props.bookName}/>


                </div>
            </div>
        </div>);
    }



    cardBody(){
       //const Example = () => <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" class="card-img-top"/>
        return(

          <div className="card-body">
               {/*<Example/>*/}
          </div>
        );
    }

    cardFooter(){
        return(
            <div className="card-footer">
                <div className="row">
                    <div className="col-md-12 ">
                        <span className="colorH  float-left"><i className="fa fa-book"/> <Link to={"/detailsAuthor/"+this.props.book.author.nameAndSurname}><span className="colorH">Written by {this.props.book.author.nameAndSurname}</span></Link></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default OneGridBook;