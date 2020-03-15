import React, {Component} from "react";
import {Link} from "react-router-dom";
import './oneNewestBookStyle.css'
import UserService from "../../../../repository/axiosUserRepository";
class oneNewestBook extends Component {

    constructor(props){
        super(props);
        this.state={
            user:UserService.currentUserValue,
            roleAdmin:false
        }
    }



    render() {
    return(

        <div className={this.props.colClass}>
            <div className="card">
                <div className="book">

                    {this.Example()}
                    {this.cardFooter()}

                </div>
            </div>
        </div>
    )
}

    Example = () => {

        return(
            <div>
                {
                    this.state.user!==null &&
                    <Link to={"/detailsBook/"+this.props.book.name}>
                        <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className="card-img-top imgWidthAndHeight"/>
                    </Link>
                }

                {
                    this.state.user===null &&
                        <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className="card-img-top imgWidthAndHeight"/>
                }


            </div>
        )
    };






    cardFooter(){
        return(
            <div className="card-footer">
                <div className="row">

                    {this.state.user!==null &&
                        <div className="col-md-12 ">
                            <span className="colorH  float-left"><i className="fa fa-book"/> <Link to={"/detailsAuthor/"+this.props.book.author.nameAndSurname}><span className="colorH">Written by {this.props.book.author.nameAndSurname}</span></Link></span>
                        </div>
                    }

                    {this.state.user===null &&
                    <div className="col-md-12 ">
                        <span className="colorH  float-left"><i className="fa fa-book"/><span className="colorH">Written by {this.props.book.author.nameAndSurname}</span></span>
                    </div>
                    }
                </div>
            </div>
        );
    }
}
export default oneNewestBook;