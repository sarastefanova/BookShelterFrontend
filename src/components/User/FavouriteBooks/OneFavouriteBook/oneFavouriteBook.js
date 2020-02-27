import {Link} from "react-router-dom";
import ConfirmDeleteFavBook from "./confirmDeleteBookFav"
import React, {Component} from "react";
import axios from "../../../../cutom-axios/axios";

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
        axios.get("/user/getStatusOrderedFavouriteBook/"+this.props.id+"/"+this.props.book.name).then((response)=>{
            this.setState({text:response.data})
        })


    }

    addOrder=(e)=>{
        console.log(this.state.text)
        this.setState({
            text:1,
            isDisabled:true
        });
        debugger;
        this.props.addOrder(this.props.bookName)

    }

    render() {
        let {pom}=this.state.isOrdered;

        if(this.state.text===0){
            pom="Order";
        }
        if(this.state.text===1){
            pom="Ordered";
        }


        return(
            <tr>
                <td><img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className=" imgAuthorOne rounded-circle"/></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.book.name}</span></td>

                <td scope="col">
                    <button  onClick={this.addOrder} className="btn btn-sm">
                        <span className="fa fa-first-order"/>
                        <span><strong>{pom}</strong></span>
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