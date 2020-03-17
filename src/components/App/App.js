import React, {Component} from 'react';
import HomePage from '../HomePage/homePage';
import './App.css';
import Header from '../Header/header';
import {BrowserRouter as Router,Redirect,Route} from "react-router-dom";
import Footer from '../Footer/footer';
import Login from '../User/LogIn/LogIn';
import Register from "../User/Register/Register";
import AuthorEdit from '../Author/EditAuthor/editAuthor';
import EditUser from '../User/EditUser/editUser';
import EditUserImg from '../User/EditUserImg/editUserImg';
import EditBook from '../Books/EditBook/editBook';
import AuthorService from '../../repository/axiosAuthorRepository';
import BookService from '../../repository/axiosBookRepository';
import BookAddWithImg from '../Books/AddBookImg/AddBookImg';
import GridBooks from '../Books/GridBooks/allBooks';
import AddAuthorImg from "../Author/AddAuthorImg/AddAuthorImg";
import DetailsAuthor from '../Author/DetailsAuthor/DetailsAuthor';
import DetailsBook from '../Books/DetailsBook/DetailsBook';
import UserService from '../../repository/axiosUserRepository';
import {User} from '../../model/user';
import MyProfile from '../User/Profile/profile';
import AllAuthors from '../Author/AllAuthors/allAuthors';

import Modal from "react-bootstrap/Modal";

import axios from "../../cutom-axios/axios";
import AllOrderedBooks from '../User/OrderedBooks/AllOrderedBooksUser/allOrderedBooks'
import AllRequests from '../User/AllRequests/AllRequestsOrdersAdmin/allRequestsAdmin'
class App extends Component{


    constructor(props){
        super(props);
        this.state={
            authors: [],
            booksNewest:[],
            books:[],
            totalPages:0,
            pageSize:3,
            currentUser:new User(),
            idCurrentUser:0,
            errorMsg:false,
            errorMsgAuthor:false,
            bookRedirect:false,
            authorRedirect:false,
            pageSizeAuthor:3,
            totalPagesAuthor:0,
            errorMessageFavourite:null,
            okFavourites:false,
            show:false,
            orderedBooksUser:[],
            showOrder:false,
            pomBooks:[],
            booksSearch:[],
            totalPagesSearch:0,
            pageSearch:0,
            pageSizeSearch:3,
            searchedBook:false,
            getAllFavBooksUser:[],
            user:UserService.currentUserValue,
            prevUser:null,
            flagSearch:null,
            searchString:""
        }
    }

    componentDidMount() {


       this.saveCurrentUser();
        this.loadBooksPaginate();
       this.loadAuthorsPaginate();
        this.loadBooksNewest();

    }

    saveCurrentUser=()=>{
        UserService.currentUser.subscribe(data => {
            debugger;
            if(this.state.prevUser!==data){
                this.setState({currentUser: data});
                this.setState({user: data});
                this.setState({prevUser: data});
                // this.loadBooksPaginate();
                this.loadBooksPaginateAllBooksUser();
            }


            debugger;
        });

    };

    createBookImg=(book)=>{
        BookService.addNewBookWithImg(book).then((response)=>{
            this.setState({
                bookRedirect:true
            });
            debugger;
            const book = response.data;
            //console.log(response+"img");

            this.setState((prevState) => {
                const newBookRef = [...prevState.books, book];
                //or
                //const terms = prevState.terms.concat(newTerm);

                return {
                    "books": newBookRef
                }
            });
            this.loadBooksPaginate();


        },error => {
            if (error.response.status === 409) {


                this.setState({
                    errorMsg:true
                });
                debugger;


            }
        });
    };

    createAuthorImg=(author)=>{
        AuthorService.addNewAuthorWithImg(author).then((response)=>{
            const author = response.data;


            this.setState({
                authorRedirect:true
            });

            this.setState((prevState) => {
                const newAuthorRef = [...prevState.authors, author];


                return {
                    "authors": newAuthorRef
                }
            });
            this.loadAuthorsPaginate();
        },error => {
            if (error.response.status === 409) {


                this.setState({
                    errorMsgAuthor:true
                });


            }
        });
    };



    loadBooksNewest = () => {
        BookService.getAllBooksNewest().then(response=>{
            this.setState((prevState)=>{
                return {
                    "booksNewest":response.data
                }
            })
        })
    };

    loadBooksPaginate = (page=0) => {
        //debugger;
        if(this.state.user!==null){
            BookService.fetchBooksTermsPaged(page,this.state.pageSize,this.state.user.id).then((data) => {
                debugger;
                console.log(data);
                debugger;
                if(data!==null){
                    debugger;
                    this.loadBooksPaginateAllBooksUser(page);
                }else {
                    this.setState({
                        books: data.data.content,
                        page:data.data.page,
                        pageSize:data.data.pageSize,
                        totalPages:data.data.totalPages
                    });
                    debugger;
                }

            })
        }else {
            BookService.fetchBooksTermsPagedUser(page,this.state.pageSize,0).then((data) => {
                debugger;
                //console.log(data.data);
                this.setState({
                    books: data.data.content,
                    page:data.data.page,
                    pageSize:data.data.pageSize,
                    totalPages:data.data.totalPages
                });

            })
        }



    };

    loadBooksPaginateAllBooksUser = (page=0) => {
        debugger;
        if(this.state.user!==null){
            if(this.state.flagSearch){
              let  userId = this.state.user===null ? 3 : this.state.user.id;
                BookService.searchBookByNamePage(this.state.searchString, this.state.pageSizeSearch,userId, page).then((data)=>{
                    console.log(data.data);
                    this.setState({

                        books: data.data.content,
                        page:data.data.page,
                        pageSize:data.data.pageSize,
                        totalPages:data.data.totalPages
                    });
                    console.log(this.state.books);

                })
            }
            else{
                BookService.fetchBooksTermsPagedUser(page,this.state.pageSize,this.state.user.id).then((data) => {
                    debugger;
                    //console.log(data.data.content.books);
                    this.setState({
                        books: data.data.content,
                        page:data.data.page,
                        pageSize:data.data.pageSize,
                        totalPages:data.data.totalPages
                    })
                })
            }
        }
  //this.getAllFavouriteBooksUser(this.state.currentUser.id);

    };





    loadAuthorsPaginate = (page=0) => {
       // debugger;
        AuthorService.fetchAuthorsTermsPaged(page,this.state.pageSizeAuthor).then((data) => {

            this.setState({
                authors: data.data.content,
                page:data.data.page,
                pageSizeAuthor:data.data.pageSize,
                totalPagesAuthor:data.data.totalPages
            })
        })

    }


    updateBooks= ((editedBook) => {
        BookService.updateBook(editedBook).then((response)=>{
            const newBook = response.data;
            this.setState((prevState) => {
                const newBooksRef = prevState.books.map((book)=>{
                    //debugger;
                    if (book.name===newBook.name) {
                        return response.data;
                    }
                    return book;
                });
                return {
                    "books": newBooksRef

                }

            });
            console.log(this.state.books);
        });
    });


    updateAuthors= ((editedAuthor) => {
        AuthorService.updateAuthorTerm(editedAuthor).then((response)=>{
            const newAuthor = response.data;
        //    console.log(newAuthor);
            this.setState((prevState) => {
                const newAuthorRef = prevState.authors.map((author)=>{
                    //debugger;
                    if (author.nameAndSurname===newAuthor.nameAndSurname) {
                        return response.data;
                    }
                    return author;
                })
                return {
                    "authors": newAuthorRef
                }
            });
        });
    });


    deleteAuthorFlag=(i,flag)=>{
        AuthorService.deleteAuthorFlag(i,flag).then((response)=>{
            // console.log(flag);
            this.loadAuthorsPaginate();
        })
    };

    onDeleteBookFav=(name)=>{
        console.log(name);
        axios.delete("/user/deleteFavBookUser/"+this.state.currentUser.id+"?name="+name).then((response)=>{
            console.log("delete book");

        });

        this.loadBooksPaginateAllBooksUser();
    };


    onDeleteBook=(bookName)=>{
        BookService.deleteBook(bookName).then((response)=>{
            this.setState((state)=>{


            })
            this.loadBooksPaginateAllBooksUser();
        })
    }

    searchData = (search) => {
            let userId;
           if (search!==""){
               this.setState({flagSearch:true});
               this.setState({searchString:search});
               debugger;
               userId = this.state.user===null ? 3 : this.state.user.id;
               BookService.searchBookByNamePage(search,this.state.pageSizeSearch,userId, 0).then((data)=>{
                    console.log(data.data);
                   this.setState({

                       books: data.data.content,
                       page:data.data.page,
                       pageSize:data.data.pageSize,
                       totalPages:data.data.totalPages
                   });
                    console.log(this.state.books);

               })


           }
           else {
               this.setState({flagSearch:false});
               this.loadBooksPaginate(0);

               debugger;
           }
    };



    addFavourite=(name,page)=>{
        debugger;
        UserService.addFavouriteBook(this.state.currentUser.id,name,this.state.currentUser).then((response)=>{
            debugger;
                this.setState({
                    okFavourites:true
                });
                console.log("page-app",page);
            this.loadBooksPaginateAllBooksUser(page);
            debugger;

        }, error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessageFavourite: "The book is already added in your list",
                    loading: false,
                    show:true
                });
            }
        })
    }

    addOrder=(name)=>{
        UserService.addOrderedBook(this.state.currentUser.id,name,this.state.currentUser).then((response)=>{

        }, error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessageFavourite: "The book is already added in your list",
                    loading: false,
                    showOrder:true
                });
            }
        })
    };

    approveOrder=(userId,bookName)=>{
        UserService.approveOrder(userId,bookName).then((response)=>{

        })
    }

    declineOrder=(userId,bookName)=>{
        UserService.declineOrder(userId,bookName).then((response)=>{

        })
    }


    addOrderNewTable=(name)=>{
        debugger;
        UserService.addOrderedBookNewTable(this.state.currentUser.id,name,this.state.currentUser).then((response)=>{
            // this.setState({
            //     okFavourites:true
            // })
          //  console.log("add");
        }, error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessageFavourite: "The book is already added in your list",
                    loading: false,
                    showOrder:true
                });
            }
        })
    }



    handleShow = () => this.setState({show:false});
    modalFavouriteDuplicate(){
          //  console.log(this.state.show)
           return(
               <Modal show={this.state.show} >
                   <Modal.Header closeButton>
                       <Modal.Title>This book is already in your favourite list!</Modal.Title>
                   </Modal.Header>

                   <Modal.Footer>
                       <button  onClick={this.handleShow}>
                           Ok
                       </button>

                   </Modal.Footer>
               </Modal>
           )
    }



    handleShowOrder = () => this.setState({showOrder:false});
    modalFavouriteDuplicateOrders(){
       // console.log(this.state.showOrder)
        return(
            <Modal show={this.state.showOrder} >
                <Modal.Header closeButton>
                    <Modal.Title>This book is already in your favourite list!</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <button  onClick={this.handleShowOrder}>
                        Ok
                    </button>

                </Modal.Footer>
            </Modal>
        )
    }

  render() {
        //console.log(this.state.currentUser)

const {currentUser}=this.state;
let {idUser}="";
if(this.state.currentUser!==null){
    idUser=this.state.currentUser.id
}else{
    idUser=0;
}


    const routing=(
        <Router>
              <Header currentUser={this.state.currentUser} onPageClick={this.loadBooksPaginate} onSearch={this.searchData}/>

          <main role="main" className="mt-3">

            <div className="container-fluid">

                <Route path={"/"} exact render={()=><HomePage booksNewest={this.state.booksNewest}/>}>
                </Route>
                <Route path={"/login"} component={Login} exact>
                </Route>
                <Route path={"/register"} component={Register} exact>
                </Route>

                <Route path={"/myProfile"}  render={()=><MyProfile addOrder={this.addOrderNewTable} onDeleteBookFav={this.onDeleteBookFav} loadAllBooks={this.loadBooksPaginateAllBooksUser} currentUser={currentUser}/>} exact>
                </Route>

                {/*Dodavanje na kniga so slika*/}
                <Route path={"/addBook"} render={()=><BookAddWithImg render={() => (<Redirect to="/" />)} bookRedirect={this.state.bookRedirect} errorMsg={this.state.errorMsg} books={this.state.books} onNewBookAddedWithImg={this.createBookImg}/>}>
                </Route>

                {/*Dodavanje na avtor so slika*/}
                <Route path={"/addAuthor"} render={()=><AddAuthorImg authorRedirect={this.state.authorRedirect} errorMsgAuthor={this.state.errorMsgAuthor} author={this.state.author} onNewAuthorAddedImg={this.createAuthorImg}/>}>
                </Route>

                <Route path="/editAuthor/:nameAndSurname" render={()=>
                    <AuthorEdit onEditedAuthor={this.updateAuthors} />}>
                </Route>

                <Route path="/editUser/:id"  render={()=>
                    <EditUser currentUser={this.state.currentUser}/>}>
                </Route>

                <Route path="/editUserImg/:id"  render={()=>
                    <EditUserImg currentUser={this.state.currentUser}/>}>
                </Route>

                <Route path="/editBook/:name" render={()=>
                    <EditBook onEditedBook={this.updateBooks}/>}>
                </Route>

                <Route path="/detailsAuthor/:nameAndSurname" render={()=>
                    <DetailsAuthor />}>
                </Route>

                <Route path="/detailsBook/:name" render={()=>
                    <DetailsBook />}>
                </Route>

                <Route path={"/allBooks"}  render={()=><GridBooks onDeleteBook={this.onDeleteBook} loadBooksPaginateAllBooksUser={this.loadBooksPaginateAllBooksUser} id={idUser} okFavourites={this.state.okFavourites} errorMessageFavourite={this.state.errorMessageFavourite} addFavourite={this.addFavourite}  onPageClick={this.loadBooksPaginate} page={this.state.page} pageSize={this.state.pageSize} totalPages={this.state.totalPages} books={this.state.books}/>}>
                </Route>

                <Route path={"/allAuthors"} render={()=><AllAuthors onDelete={this.deleteAuthorFlag}  onPageClick={this.loadAuthorsPaginate} totalPages={this.state.totalPagesAuthor} authors={this.state.authors}/>}>
                </Route>

                <Route path={"/allOrderedBooks/:id"} render={()=><AllOrderedBooks  id={this.state.currentUser.id}/>}>
                </Route>

                <Route path={"/allRequests"} render={()=><AllRequests declineOrder={this.declineOrder} approveOrder={this.approveOrder}  id={this.state.currentUser.id}/>}>
                </Route>
            </div>

          </main>
            <Footer/>


        </Router>
    );


    return(
        <div className="App">
          {routing}
            {this.modalFavouriteDuplicate()}
            {this.modalFavouriteDuplicateOrders()}
        </div>



    );


  }
}

export default App;
