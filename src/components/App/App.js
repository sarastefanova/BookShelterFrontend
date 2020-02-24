import React, {Component, useState} from 'react';
import HomePage from '../HomePage/homePage';
import './App.css';
import Header from '../Header/header';
import {BrowserRouter as Router,Redirect,Route} from "react-router-dom";
import Footer from '../Footer/footer';
import Login from '../User/LogIn/LogIn';
import Register from "../User/Register/Register";
import AuthorAdd from '../Author/AddAuthor/addAuthor';
import AuthorEdit from '../Author/EditAuthor/editAuthor';
import EditUser from '../User/EditUser/editUser';
import EditUserImg from '../User/EditUserImg/editUserImg';
import BookAdd from '../Books/AddBook/addBook';
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
import ModalFavourite from '../ModalFavoutite/modalFavourite'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "../../cutom-axios/axios";

class App extends Component{


    constructor(props){
        super(props);
        this.state={
            authors: [],
            books:[],
            totalPages:0,
            pageSize:6,
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
            show:false
        }
    }

    componentDidMount() {

        this.loadBooksPaginate();
       this.saveCurrentUser();
       this.loadAuthorsPaginate();
    }

    saveCurrentUser=()=>{
        UserService.currentUser.subscribe(data => {
           // debugger;
            this.setState({currentUser: data});
            debugger;
        });

    };

    loadAuthors = () => {
        AuthorService.getAllAuthors().then(response=>{
            this.setState((prevState)=>{
                return {
                    "authors":response.data
                }
            })
        })
    };


    createAuthor = (author) => {
        AuthorService.addNewAuthor(author).then((response)=>{
            const author = response.data;

            this.setState((prevState) => {
                const newAuthorRef = [...prevState.authors, author];
                //or
                //const terms = prevState.terms.concat(newTerm);

                return {
                    "authors": newAuthorRef
                }
            });
        });

    };


    createBook = (book) => {
        BookService.addNewBook(book).then((response)=>{
            const book = response.data;
            console.log(response+"dd");

            this.setState((prevState) => {
                const newBookRef = [...prevState.books, book];
                //or
                //const terms = prevState.terms.concat(newTerm);

                return {
                    "books": newBookRef
                }
            });
        });

    };


    createBookImg=(book)=>{
        BookService.addNewBookWithImg(book).then((response)=>{
            this.setState({
                bookRedirect:true
            });
            debugger;
            const book = response.data;
            console.log(response+"img");

            this.setState((prevState) => {
                const newBookRef = [...prevState.books, book];
                //or
                //const terms = prevState.terms.concat(newTerm);

                return {
                    "books": newBookRef
                }
            });
            this.loadBooksPaginate();
            // debugger;
            // return <Redirect to='/'/>;
            // debugger;

        },error => {
            if (error.response.status === 409) {
                console.log("error");

                this.setState({
                    errorMsg:true
                });
                debugger;
                // setErrorMessage("Username is already taken!")

            }
        });
    };

    createAuthorImg=(author)=>{
        AuthorService.addNewAuthorWithImg(author).then((response)=>{
            const author = response.data;
            console.log(response+"img");

            this.setState({
                authorRedirect:true
            });

            this.setState((prevState) => {
                const newAuthorRef = [...prevState.authors, author];
                //or
                //const terms = prevState.terms.concat(newTerm);

                return {
                    "authors": newAuthorRef
                }
            });
            this.loadAuthorsPaginate();
        },error => {
            if (error.response.status === 409) {
                console.log("error");

                this.setState({
                    errorMsgAuthor:true
                });
              //  debugger;
                // setErrorMessage("Username is already taken!")

            }
        });
    };

    loadBooks = () => {
        BookService.getAllBooks().then(response=>{
            this.setState((prevState)=>{
                return {
                    "books":response.data
                }
            })
        })
    };

    loadBooksPaginate = (page=0) => {
        //debugger;
        BookService.fetchBooksTermsPaged(page,this.state.pageSize).then((data) => {
        
            this.setState({
                books: data.data.content,
                page:data.data.page,
                pageSize:data.data.pageSize,
                totalPages:data.data.totalPages
            })
        })

    }

    loadAuthorsPaginate = (page=0) => {
        //debugger;
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
                })
                return {
                    "books": newBooksRef
                }
            });
        });
    });


    updateAuthors= ((editedAuthor) => {
        AuthorService.updateAuthorTerm(editedAuthor).then((response)=>{
            const newAuthor = response.data;
            console.log(newAuthor);
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



    deleteBook=(i)=>{
        BookService.deleteBook(i).then((response)=>{
            this.setState((state)=>{
                const books=state.books.filter((t)=>{
                    return t.name!==i;
                });
                return {books}
            })
        })
    };

    deleteAuthor=(i)=>{
        AuthorService.deleteAuthorTerm(i).then((response)=>{
            this.setState((state)=>{
                const authors=state.authors.filter((t)=>{
                    return t.nameAndSurname!==i;
                });
                return {authors}
            })
        })
    };

    deleteAuthorFlag=(i,flag)=>{
        AuthorService.deleteAuthorFlag(i,flag).then((response)=>{
            // console.log(flag);
            this.setState((state)=>{
                const authors=state.authors.map((t)=>{
                    return t.nameAndSurname!==i;
                });
                return {authors}
            })
        })
    };

    onDeleteBookFav=(name)=>{
        console.log(name)
        axios.delete("/user/deleteFavBookUser/"+this.state.currentUser.id+"?name="+name).then((response)=>{
            console.log("delete book");
        })
    }

    searchData = (search) => {

           if (search!==""){
               BookService.searchBookByName(search,this.state.pageSize).then((response)=>{

                   this.setState({
                       books: response.data,
                       page:0,
                      //  pageSize:0,
                       totalPages:0
                   })
               })
           }
           else {

               this.loadBooksPaginate(0);
           }
    };

    addFavourite=(name)=>{
        UserService.addFavouriteBook(this.state.currentUser.id,name,this.state.currentUser).then((response)=>{
                this.setState({
                    okFavourites:true
                })

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

    updateUser= ((editedUser) => {
        UserService.updateUser(editedUser).then((response)=>{
            const newUser= response.data;
            this.setState({
                "currentUser":newUser
            })
        });
    });

    logout() {
        UserService.logOut().then(data => {
            this.state.history.push('/');
        }, error => {
            this.setState({
                errorMessage: "Unexpected error occurred."
            });
        });
    }

    saveId(){
        this.setState({
            idCurrentUser:this.state.currentUser.id
        })
    }


    handleShow = () => this.setState({show:false});
    modalFavouriteDuplicate(){
            console.log(this.state.show)
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

  render() {
const {currentUser}=this.state;




    const routing=(
        <Router>
              <Header currentUser={this.state.currentUser} onPageClick={this.loadBooksPaginate} onSearch={this.searchData}/>

          <main role="main" className="mt-3">

            <div className="container-fluid">

                <Route path={"/"} exact render={()=><HomePage />}>
                </Route>
                <Route path={"/login"} component={Login} exact>
                </Route>
                <Route path={"/register"} component={Register} exact>
                </Route>

                {/*<Route path={"/allBooksFavourite"} component={AllBooksFavourite} exact>*/}
                {/*</Route>*/}

                {/*<Route path={"/myProfile"} component={MyProfile} currentUser={this.state.currentUser}>*/}
                {/*</Route>*/}

                <Route path={"/myProfile"}  render={()=><MyProfile onDeleteBookFav={this.onDeleteBookFav} currentUser={currentUser}/>} exact>
                </Route>

                {/*Bez slika dodavanje na avtor*/}
                {/*<Route path={"/addAuthor"} render={()=><AuthorAdd onNewAuthorAdded={this.createAuthor}/>}>*/}
                {/*</Route>*/}

                {/*Bez slika dodavanje na kniga*/}
                {/*<Route path={"/addBook"} render={()=><BookAdd onNewBookAdded={this.createBook}/>}>*/}
                {/*</Route>*/}

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

                <Route path={"/allBooks"} render={()=><GridBooks okFavourites={this.state.okFavourites} errorMessageFavourite={this.state.errorMessageFavourite} addFavourite={this.addFavourite} onDelete={this.deleteBook} onPageClick={this.loadBooksPaginate} totalPages={this.state.totalPages} books={this.state.books}/>}>
                </Route>

                <Route path={"/allAuthors"} render={()=><AllAuthors onDelete={this.deleteAuthorFlag}  onPageClick={this.loadAuthorsPaginate} totalPages={this.state.totalPagesAuthor} authors={this.state.authors}/>}>
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
        </div>



    );


  }
}

export default App;
