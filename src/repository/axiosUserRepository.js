import axios from '../cutom-axios/axios';
import {BehaviorSubject} from 'rxjs';
import qs from "qs";

const currentUserSubject = new BehaviorSubject(JSON.parse((localStorage.getItem('currentUser'))));
const currentUserSubjectSession = new BehaviorSubject(JSON.parse((sessionStorage.getItem('currentUser'))));
class UserService {

    get currentUserValue(){
        return currentUserSubject.value;
    }

    get CurrentUserValueSession(){
        return currentUserSubjectSession.value;
    }

    get currentUser(){
        return currentUserSubject.asObservable();
    }
    get currentUserSession(){
        return currentUserSubjectSession.asObservable();
    }

    login(user){
        const headers = {
            authorization:'Basic ' + btoa(user.userName + ':' + user.password)
        };


        return axios.get( '/user/login', {headers: headers}).then(response => {
           // debugger;
            console.log(JSON.stringify(response.data))

           // sessionStorage.setItem('currentUser', JSON.stringify(response.data));
            //debugger;
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            //debugger;
            currentUserSubject.next(response.data);
           // currentUserSubjectSession.next(response.data)
           // debugger;
        });
    }

    logOut(){

        return axios.post('/user/logout', {}).then(response => {
            console.log("logout!");
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
        })
    }

    addFavouriteBook(id,name,user){
        //debugger;
        console.log("babsabj")
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        return axios.patch("/user/addFavouriteBookFlag/"+id+"/"+name, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    approveOrder(userId,bookName){
        return    axios.patch("/user/approveOrder/"+userId+"/"+bookName,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    declineOrder(userId,bookName){
        return    axios.patch("/user/declineOrder/"+userId+"/"+bookName,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    addOrderedBook(id,name,user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        return axios.patch("/user/addOrderedBook/"+id+"/"+name, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    addOrderedBookNewTable(id,name,user){
        debugger;
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        return axios.patch("/user/addOrderedBookWithStatus/"+id+"/"+name, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
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

        //const userId=user;
        //const formParams = qs.stringify(newUser);
        console.log(JSON.stringify(newUser));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        console.log(localStorage.getItem('currentUser'));
        currentUserSubject.next(newUser);
        return axios.patch("/user/editUser/"+id,user    , {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    }
}


export default new UserService();