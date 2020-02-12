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
                        <hr/>
                    </div>
                </div>
            </div>
        )

    }

   Example = () => <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" class="card-img-top imgWidthAndHeight"/>
    cardHeader(){
        return (<div className="card-header">
            <div className="row">
                <div className="col-md-6">
                    {this.props.book.name}
                </div>
                <div className="col-md-6 text-right">
                    <a href="#" className="btn btn-light" title="Следи">
                        <i className="fa fa-star"/>
                    </a>
                    <Link className="btn btn-default" ><i className="fa fa-pencil"/></Link>
                    <a  className="btn btn-danger" title="Избриши">
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
                    <div className="col-md-12">
                        <span>Written by {this.props.book.author.nameAndSurname}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default OneGridBook;