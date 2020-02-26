import {Link} from "react-router-dom";
import ConfirmDeleteFavBook from "./confirmDeleteBookFav"
import React, {Component} from "react";

class OneFavouriteBook extends Component{

    constructor(props){
        super(props);

        this.state={
            text:"Order"
        }
    }

    addOrder=(e)=>{
        //console.log(this.props);
        this.setState({
            text:"Ordered"
        });
        this.props.addOrder(this.props.bookName)

    }

    render() {

        return(
            <tr>
                <td><img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className=" imgAuthorOne rounded-circle"/></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.book.name}</span></td>

                <td scope="col">
                    <button onClick={this.addOrder} className="btn btn-sm">
                        <span className="fa fa-first-order"/>
                        <span><strong>{this.state.text}</strong></span>
                    </button>
                    {/*<button  className="btn btn-sm btn-outline-secondary ">*/}
                    {/*    <span className="fa fa-remove"/>*/}
                    {/*    <span><strong>Remove</strong></span>*/}
                    {/*</button>*/}
                    <ConfirmDeleteFavBook onDeleteBookFav={this.props.onDeleteBookFav}  bookName={this.props.book.name}/>

                </td>
            </tr>
        )
    }
}
export default OneFavouriteBook;