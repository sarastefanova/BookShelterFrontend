import React, {Component} from 'react';
import Moment from "react-moment";
import {Link} from "react-router-dom"
import './AuthoOneStyle.css';
import ConfirmDelete from './ConfirmDeleteAuthor'


class OneAuthor extends Component{

    render() {

        return(
            <tr>
                <td><img src={`data:image/jpeg;base64,${this.props.term.file}`}  alt="" className=" imgAuthorOne rounded-circle"/></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.term.nameAndSurname}</span></td>

                <td scope="col">
                    <Link to={"/editAuthor/"+this.props.nameAndSurname} className="btn btn-sm btn-secondary">
                        <span className="fa fa-edit"/>
                        <span><strong>Edit</strong></span>
                    </Link>
                    {/*<button  className="btn btn-sm btn-outline-secondary ">*/}
                    {/*    <span className="fa fa-remove"/>*/}
                    {/*    <span><strong>Remove</strong></span>*/}
                    {/*</button>*/}
                    <ConfirmDelete onDelete={this.props.onDelete} isDeleted={this.props.isDeleted} nameAndSurname={this.props.nameAndSurname}/>
                    <Link to={"/detailsAuthor/"+this.props.nameAndSurname}  className="btn btn-sm btn-outline-dark">
                        <span><strong>Details</strong></span>
                    </Link>
                </td>
            </tr>
        )
    }
}

export default OneAuthor;