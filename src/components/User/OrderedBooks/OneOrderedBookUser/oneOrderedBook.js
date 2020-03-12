import {Link} from "react-router-dom";
import ConfirmDeleteOrderedBook from './confirmDeleteOrderedBook';
import axios from '../../../../cutom-axios/axios'
import React, {Component} from "react";

class OneOrderedBook extends Component{

    constructor(props){
        super(props);
        this.state={
            status:"",
            statusString:""
        }
    }

    componentDidMount() {
        axios.get("/user/getStatusBookOrdered/"+this.props.id+"/"+this.props.book.name).then((response)=>{
            this.setState({status:response.data})
        })


    }


    render() {
        console.log(this.state.status);
        let {pom}=this.state.statusString;

        if(this.state.status===0){
            pom="Order is in progress";
        }
        if(this.state.status===1){
            pom="Book is sent";
        }
        if(this.state.status===2){
            pom="Not available books at the moment at our storage!";
        }

        return(
            <tr>
                <td><img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className=" imgAuthorOne rounded-circle"/></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.book.name}</span></td>

                <td scope="col">


                    <ConfirmDeleteOrderedBook onDeleteBookOrdered={this.props.onDeleteBookOrdered}  bookName={this.props.book.name}/>

                </td>
                <td scope="col">{pom}</td>
            </tr>
        )
    }
}
export default OneOrderedBook;