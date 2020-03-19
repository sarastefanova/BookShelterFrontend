import {Link} from "react-router-dom";
import ConfirmDeleteFavBook from "./confirmDeleteBookFav"
import React, {Component} from "react";
import UserService from '../../../../repository/axiosUserRepository';
import './oneFavouriteBooks.css'

class OneFavouriteBook extends Component{

    constructor(props){
        super(props);

        this.state={
            text:null,
            isOrdered:"",
            idDisabled:false
        }
    }

    componentDidMount() {
        UserService.getStatusOrderedFavouriteBook(this.props.id, this.props.book.name).then((response)=>{
            this.setState({text:response.data})
        })

    }

    addOrder=(e)=>{
        console.log(this.state.text);
        this.setState({
            text:1,
            isDisabled:true
        });
        debugger;
        console.log("page-one-book-fav",this.props.page);
        console.log("namebook",this.props.bookName);
        this.props.addOrder(this.props.bookName, this.props.page, this.props.id, this.props.user);


    };

    render() {

        return(
            <tr>
                <td><img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className=" imgAuthorOne rounded-circle"/></td>
                <td scope="col"><Link to={"/detailsBook/"+this.props.book.name}><span className="nameAuthorOneBook  font-weight-bold">{this.props.book.name}</span></Link></td>

                <td scope="col">
                    {this.props.isOrdered===1 &&
                        <button  onClick={this.addOrder} className="btn btn-sm">
                            <span className="fa fa-first-order"/>
                            <span><strong>Ordered</strong></span>
                        </button>
                    }

                    {this.props.isOrdered===0 &&
                    <button  onClick={this.addOrder} className="btn btn-sm">
                        <span className="fa fa-first-order"/>
                        <span><strong>Order</strong></span>
                    </button>
                    }
                    <ConfirmDeleteFavBook onDeleteBookFav={this.props.onDeleteBookFav}  bookName={this.props.book.name}/>

                </td>
                <td scope="col"></td>
            </tr>
        )
    }
}
export default OneFavouriteBook;