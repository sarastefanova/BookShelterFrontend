import React,{useState,useEffect} from 'react'
import './EditUser.css'
import { useHistory, useParams } from 'react-router-dom';
import axios from "../../../cutom-axios/axios";
import UserService from "../../../repository/axiosUserRepository";
const editUser = (props) =>{
    const history = useHistory();
    const {id}=useParams();


    const [detailsUser,setDetailsUser]=useState({});

    useEffect(()=>{

        axios.get("/user?id="+id).then((data)=>{
            setDetailsUser(data.data)
        })
    },[]);

    const showErrorMessage=()=>{
        let div=document.getElementById("errorMessage");
        div.style.visibility="visible";
    };

    const hideErrorMessage=()=>{
        history.push("/");

    };

    const updateUser= ((editedUser) => {
        UserService.updateUser(editedUser).then((response)=>{
            //const newUser= response.data;

            hideErrorMessage();

        }, error => {
            if (error.response.status === 409) {
                console.log("error");


                showErrorMessage();
            }
        });
    });

    const onFormSubmit = (e) => {

        e.preventDefault();

        const newUser = {
            "id":id,
            "name": e.target.name.value,
            "surname":e.target.surname.value,
            "userName": e.target.userName.value,
            "address":e.target.address.value,
            "number":e.target.number.value,
            "email":e.target.email.value
        };


        //console.log(newUser);
        updateUser(newUser);



    };





    const handleTermOnChange  = (e) => {
        const paramName = e.target.name;
        const paramValue =  e.target.value;
        setDetailsUser({[paramName]:paramValue});
        console.log(e.target.value);
    }
    return(
        <div className="container containerEditUser">
                        <form onSubmit={onFormSubmit}>
                            <h1 className="colorH">Edit this user</h1>

                            <div className="form-group">
                                <label className="labelLogin">First name</label>
                                <input type="text" value={detailsUser.name} onChange={handleTermOnChange} name="name" className="form-control col-md-6"/>
                            </div>



                            <div className="form-group">
                                <label className="labelLogin4">Surname</label>
                                <input type="text"  value={detailsUser.surname} onChange={handleTermOnChange} name="surname" className="form-control col-md-6"/>
                            </div>

                            <div className="form-group">
                                    <div className="alert alert-danger errorMessage col-md-6" id="errorMessage" role="alert">
                                        <strong>Error! </strong> Username is already taken!
                                    </div>
                                <label className="labelLogin">User name</label>
                                <input type="text" value={detailsUser.username} onChange={handleTermOnChange} name="userName" className="form-control col-md-6"/>
                            </div>
                            <div className="form-group">
                                <label className="labelLogin5">Email</label>
                                <input type="email" value={detailsUser.email} onChange={handleTermOnChange} name="email" className="form-control col-md-6" />
                            </div>

                            <div className="form-group">
                                <label className="labelLogin2">Phone number</label>
                                <input type="text" name="number" value={detailsUser.number} onChange={handleTermOnChange} className="form-control col-md-6"  />
                            </div>

                            <div className="form-group">
                                <label className="labelLogin2">Home address</label>
                                <input type="text" value={detailsUser.address} onChange={handleTermOnChange} name="address" className="form-control col-md-6" />
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
export default editUser;