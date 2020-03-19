import axios from '../cutom-axios/axios';
import {BehaviorSubject} from 'rxjs';
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
        return axios.patch("/user/addFavouriteBook/"+id+"/"+name, {
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
        debugger;
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        return axios.patch("/user/addOrderedBook/"+id+"/"+name, {
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

    updateUser(user,id,newUser)  {
        console.log(JSON.stringify(newUser));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        console.log(localStorage.getItem('currentUser'));
        currentUserSubject.next(newUser);
        return axios.patch("/user/"+id,user    , {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    }

    getAllRequestsPaginate(page, pageSize) {
        return   axios.get("/user/getAllRequestsPaginate",{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    }

    getUserByBook(id, bookName){
        return axios.get("/user/getUserByBook/"+id+"/"+bookName);
    }

    getUserById(id){
        return axios.get("/user?id="+id);
    }

    getFavouriteBooksUserPaginate(page, pageSize, id){
        return axios.get("/user/getFavouriteBooksUserPaginate/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    }

    deleteFavouriteBookUser(id, name){
        return axios.delete("/user/deleteFavouriteBookUser/"+id+"?name="+name);
    }

    getStatusOrderedFavouriteBook(id, bookName){
        return axios.get("/user/getStatusOrderedFavouriteBook/"+id+"/"+bookName);
    }

    allOrderedBooksPaginate(id, page, pageSize){
        return axios.get("/user/allOrderedBooksPaginate/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        });
    }

    deleteOrderedBookUser(id, name){
        return axios.delete("/user/deleteOrderedBookUser/"+id+"?name="+name)
    }

    getStatusBookOrdered(id, bookName){
        return axios.get("/user/getStatusBookOrdered/"+id+"/"+bookName);
    }
}


export default new UserService();