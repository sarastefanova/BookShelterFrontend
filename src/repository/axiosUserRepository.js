import axios from '../cutom-axios/axios';
import {BehaviorSubject} from 'rxjs';
import qs from "qs";

const currentUserSubject = new BehaviorSubject(JSON.parse((localStorage.getItem('currentUser'))));

class UserService {

    get currentUserValue(){
        return currentUserSubject.value;
    }

    get currentUser(){
        return currentUserSubject.asObservable();
    }

    login(user){
        const headers = {
            authorization:'Basic ' + btoa(user.userName + ':' + user.password)
        };

        return axios.get( '/user/login', {headers: headers}).then(response => {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            currentUserSubject.next(response.data);
        });
    }

    logOut(){

        return axios.post('/user/logout', {}).then(response => {
            console.log("logout!");
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
        })
    }

    register(user){
        console.log(user);
        return axios.post( '/user/registration', JSON.stringify(user),
            {headers: {'Content-Type':'application/json; charset=UTF-8'}});
    }


    updateUser(user)  {

    const userId=user.id;
    const formParams = qs.stringify(user);
    console.log(user.id);
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
    return axios.patch("/user/"+userId,formParams, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
}

    updateUserImg(user,id,newUser)  {

        const userId=user;
        const formParams = qs.stringify(newUser);
        console.log(JSON.stringify(newUser));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        currentUserSubject.next(newUser);
        return axios.patch("/user/editUser/"+id,user    , {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    }
}


export default new UserService();