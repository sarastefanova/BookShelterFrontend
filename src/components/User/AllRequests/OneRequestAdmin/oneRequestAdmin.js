import {Link} from "react-router-dom";
import axios from '../../../../cutom-axios/axios'
import React, {Component} from "react";

class OneRequest extends Component{

    constructor(props) {
        super(props);

        this.state={
            authorsDetails:[]
        }
    }

    componentDidMount() {
        axios.get("/books/"+this.props.bookName+"/authorBook").then((response)=>{
            debugger;
            this.setState({
                authorsDetails:response.data
            })
            debugger;
        })
    }


    render() {

        return(
            <tr>
                <td><img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className=" imgAuthorOne rounded-circle"/></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.book.name}</span></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.book.availability}</span></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.state.authorsDetails.nameAndSurname}</span></td>
                <td scope="col">
                    <button onClick={this.addOrder} className="btn btn-sm btn-secondary">
                        <span className="fa fa-first-order"/>
                        <span><strong>Accept</strong></span>
                    </button>
                    <button>
                        Decline
                    </button>
                    {/*<button  className="btn btn-sm btn-outline-secondary ">*/}
                    {/*    <span className="fa fa-remove"/>*/}
                    {/*    <span><strong>Remove</strong></span>*/}
                    {/*</button>*/}
                    {/*<ConfirmDeleteFavBook onDeleteBookFav={this.props.onDeleteBookFav}  bookName={this.props.book.name}/>*/}

                </td>
            </tr>
        )
    }
}
export default OneRequest;