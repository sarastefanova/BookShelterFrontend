import {Link} from "react-router-dom";
import axios from '../../../../cutom-axios/axios'
import React, {Component} from "react";
import './styleOneRequest.css'
class OneRequest extends Component{

    constructor(props) {
        super(props);

        this.state={
            authorsDetails:[],
            userDetails:[],
            approved:false,
            declined:false,
            closeApprove:false
        }
    }

    componentDidMount() {
        axios.get("/books/"+this.props.bookName+"/authorBook").then((response)=>{

            this.setState({
                authorsDetails:response.data
            })

        }),

            axios.get("/user/getUserByBook/"+this.props.user.id+"/"+this.props.bookName).then((response)=>{
                this.setState({
                    userDetails:response.data
                })
            })
    }

    approveOrder=()=>{
        debugger;
        if(this.props.book.availability>0){
            debugger;
            this.props.approveOrder(this.state.userDetails.id,this.props.book.name);

        }else{
            //alert('You can\'t decline this request');
            this.setState({approved:true})
        }
    };

    declineOrder=()=>{
        if(this.props.book.availability===0){

            this.props.declineOrder(this.state.userDetails.id,this.props.book.name);

        }else{
            //alert('You can\'t approve this request');
            this.setState({declined:true})
        }
    }

    render() {

        return(

            <tr>

                <td><img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className=" imgAuthorOne rounded-circle"/></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.state.userDetails.username}</span></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.book.name}</span></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.props.book.availability}</span></td>
                <td scope="col"><span className="nameAuthorOne font-weight-bold">{this.state.authorsDetails.nameAndSurname}</span></td>
                <td scope="col">
                    <button onClick={this.approveOrder} className="btn btn-sm btn-secondary">
                        <span className="fa fa-first-order"/>
                        <span><strong>Accept</strong></span>
                    </button>
                    <button onClick={this.declineOrder} className="btn btn-sm btn-primary">
                        <span className="fa fa-trash"/>
                        <strong>Decline</strong>
                    </button>

                </td>
                {this.state.approved &&
                <td scope="col" className="font-weight-bold colorApproveDecline">You can't decline this request!</td>
                }
                {this.state.declined &&
                <td scope="col"  className="font-weight-bold colorApproveDecline">You can't decline this request!</td>}
            </tr>

        )
    }
}
export default OneRequest;