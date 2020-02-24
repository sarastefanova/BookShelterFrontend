import React, {useState, useEffect, Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom';
import './editUserImg.css';
import axios from "../../../cutom-axios/axios";
import UserService from "../../../repository/axiosUserRepository";
import avatar from "../../AllPhotos/avatar.jpg";
class editUserImg extends Component{
    // const history = useHistory();
    // const {id}=useParams();
    // let errorMsg='';
    // let okFlag=false;
    // let errorFlag=false;
    // const [detailsUser,setDetailsUser]=useState({});
    // const [ errorMessage,setErrorMessage]=useState('');
    // useEffect(()=>{
    //
    //     axios.get("/user?id="+id).then((data)=>{
    //         setDetailsUser(data.data)
    //     })
    // },[]);

    constructor(props){
        super(props);

        this.state={
            detailsUser:[],
            selectedFile:null,
            id:this.props.match.params.id,
            imagePreviewUrl:null
        }
    }

    componentDidMount() {
        axios.get("/user?id="+this.state.id).then((data)=>{
                    this.setState(
                        {
                            detailsUser:data.data
                        }
                    )
                });
    }


    onFormSubmit = (e) => {

        e.preventDefault();

        const newUser = {
            "id":this.state.id,
            "name": e.target.name.value,
            "surname":e.target.surname.value,
            "userName": e.target.userName.value,
            "address":e.target.address.value,
            "number":e.target.number.value,
            "email":e.target.email.value
        };

        const formData = new FormData();
        formData.append('id',this.state.id);
        formData.append('name',e.target.name.value);
        formData.append('surname',e.target.surname.value);
        formData.append('userName',e.target.userName.value);
        formData.append('file', this.state.selectedFile);
        formData.append('address',e.target.address.value);
        formData.append('number',e.target.number.value);
        formData.append('email',e.target.email.value);

        //console.log(newUser);
        console.log(formData);
        this.updateUser(formData,newUser);



    };

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let file=e.target.files[0];
        this.setState({selectedFile:file});
        this.setState({
            id:this.props.match.params.id
        });

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(e.target.files[0])

    };

     updateUser= ((editedUser,newUser) => {
        UserService.updateUserImg(editedUser,this.state.id,newUser).then((response)=>{
            const newUser= response.data;
           // console.log(editedUser);
            // localStorage.setItem('currentUser', JSON.stringify(response.data));
            // debugger;
            this.hideErrorMessage();
            // okFlag=true;
            // errorFlag=false;
            this.props.history.push("/myProfile");
        }, error => {
            if (error.response.status === 409) {
                console.log("error");

                // setErrorMessage("Username is already taken!")
                this.showErrorMessage();
            }
        });
    });

     showErrorMessage=()=>{
        let div=document.getElementById("errorMessage");
        div.style.visibility="visible";
    };
    hideErrorMessage=()=>{
        let div=document.getElementById("errorMessage");
        div.style.visibility="hidden";
    }

    hideAvatar=()=>{
        //history.push("/");
        let div=document.getElementById("imgAvatar");
        div.style.display="none";
    }

     handleTermOnChange  = (e) => {
        const paramName = e.target.name;
        const paramValue =  e.target.value;
        this.setState({
            detailsUser:e.target.value
        })
        //console.log(e.target.value);
    }

    render(){
        let $imagePreview;
        let $imagePreviewAvatar;
        if (this.state.imagePreviewUrl) {
            //$imagePreviewAvatar.hide();
            this.hideAvatar();
            console.log(this.state.imagePreviewUrl);
            $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" className="photoProfile rounded-circle" /> </div>);
        }
        if(this.state.detailsUser.file==null){
            $imagePreviewAvatar = (<div id="imgAvatar" className="image-container" ><img src={avatar} alt="icon" className="photoProfileAvatar rounded-circle" /> </div>);
        }else {
            $imagePreviewAvatar = (<div id="imgAvatar" className="image-container" ><img src={`data:image/jpeg;base64,${this.state.detailsUser.file}`}  alt="" className="photoProfileAvatar rounded-circle"/></div>);
        }


         console.log(this.state.detailsUser);
        return(
            <div className="container containerEditUserImg">
                <form onSubmit={this.onFormSubmit}>
                    <h1 className="colorH">Edit this user</h1>
                    {$imagePreviewAvatar}
                    { $imagePreview }
                    <div className="alert alert-danger errorMessage col-md-6" id="errorMessage" role="alert">
                        <strong>Error! </strong> Username is already taken!
                    </div>
                    <div className="form-group files color">
                        <label className="bookAddLabel2">Upload Your File </label>
                        <input  type="file" name={"file"} id="file" onChange={(event => this.onFileChangeHandler(event))} className="form-control col-md-6"/>
                    </div>
                    <div className="form-group">
                        <label className="labelLogin">First name</label>
                        <input required type="text" value={this.state.detailsUser.name} onChange={this.handleTermOnChange} name="name" className="form-control col-md-6"/>
                    </div>

                    <div className="form-group">
                        <label className="labelLogin4">Surname</label>
                        <input required type="text"  value={this.state.detailsUser.surname} onChange={this.handleTermOnChange} name="surname" className="form-control col-md-6"/>
                    </div>

                    <div className="form-group">

                        <label className="labelLogin">User name</label>
                        <input required type="text" value={this.state.detailsUser.username} onChange={this.handleTermOnChange} name="userName" className="form-control col-md-6"/>
                    </div>
                    <div className="form-group">
                        <label className="labelLogin5">Email</label>
                        <input required type="email" value={this.state.detailsUser.email} onChange={this.handleTermOnChange} name="email" className="form-control col-md-6" />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin2">Phone number</label>
                        <input type="text" name="number" pattern="^\d{3}-\d{3}-\d{3}$" placeholder="xxx-xxx-xxx" required  value={this.state.detailsUser.number} onChange={this.handleTermOnChange} className="form-control col-md-6"  />
                    </div>

                    <div className="form-group">
                        <label className="labelLogin2">Home address</label>
                        <input type="text" value={this.state.detailsUser.address} onChange={this.handleTermOnChange} required name="address" className="form-control col-md-6" />
                    </div>


                    <button type="submit" className="btn btnColor col-md-6 btn-block">Edit</button>

                    <br/>
                    <br/>
                    <br/>

                </form>

                <br/>

            </div>
        )
    }


}
export default withRouter(editUserImg);