import React, {Component} from "react";
import {Link} from "react-router-dom"
import './OneGridBookStyle.css'
class OneGridBook extends Component{
        state={
             url : ""
        }
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

    Example = () => <Link to={"/detailsBook/"+this.props.book.name}><img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className="card-img-top imgWidthAndHeight"/></Link>
    cardHeader(){
        return (<div className="card-header">
            <div className="row">
                <div className="col-md-6 font-weight-bold font-italic fontNameBook">
                    {this.props.book.name}
                </div>
                <div className="col-md-6 text-right">
                    <a href="#" className="btn btn-light" title="Следи">
                        <i className="fa fa-star"/>
                    </a>
                    <Link to={"/editBook/"+this.props.book.name}  className="btn btn-default" ><i className="fa fa-pencil"/></Link>
                    <a  onClick={()=>this.props.onDelete(this.props.bookName)} className="btn btn-danger" title="Избриши">
                        <i className="fa fa-trash"/>
                    </a>
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