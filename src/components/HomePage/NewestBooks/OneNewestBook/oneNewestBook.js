import React, {Component} from "react";
import {Link} from "react-router-dom";
import Confirm from "../../../Books/OneBook/Confirm";

class oneNewestBook extends Component {

render() {
    return(

        <div className={this.props.colClass}>
            <div className="card ">
                <div className="book">
                    {this.cardHeader()}
                    {this.Example()}

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

                </div>
            </div>
        </div>);
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
export default oneNewestBook;