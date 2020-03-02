import React, {Component} from "react";
import {Link} from "react-router-dom";
import './oneNewestBookStyle.css'
class oneNewestBook extends Component {

render() {
    return(

        <div className={this.props.colClass}>
            <div className="card">
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

            </div>
        )
    }

    cardHeader(){

        return (<div className="card-header cardBookNewestHeader">
            <div className="row">
                <div className="col-md-6 font-weight-bold font-italic headerText">
                    <span className="fontNameBook">{this.props.book.name}</span>
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