import React, {Component} from 'react';
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
import BookAdd from '../Books/AddBook/addBook';
import EditBook from '../Books/EditBook/editBook';
import AuthorService from '../../repository/axiosAuthorRepository';
import BookService from '../../repository/axiosBookRepository';
import BookAddWithImg from '../Books/AddBookImg/AddBookImg'

class App extends Component{


    constructor(props){
        super(props);
        this.state={
            authors: [],
            books:[]
        }
    }

    componentDidMount() {


    }

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

  render() {

    const routing=(
        <Router>
          <Header/>

          <main role="main" className="mt-3">

            <div className="container-fluid">
                <Route path={"/"} exact render={()=><HomePage/>}>
                </Route>
                <Route path={"/login"} render={()=><Login />}>
                </Route>
                <Route path={"/register"} render={()=><Register />}>
                </Route>
                <Route path={"/addAuthor"} render={()=><AuthorAdd onNewAuthorAdded={this.createAuthor}/>}>
                </Route>

                <Route path={"/addBook"} render={()=><BookAdd onNewBookAdded={this.createBook}/>}>
                </Route>

                <Route path={"/upload"} render={()=><BookAddWithImg books={this.state.books} onNewBookAddedWithImg={this.createBookImg}/>}>
                </Route>

                <Route path="/editAuthor" render={()=>
                    <AuthorEdit />}>
                </Route>

                <Route path="/editUser" render={()=>
                    <EditUser />}>
                </Route>

                <Route path="/editBook" render={()=>
                    <EditBook />}>
                </Route>

            </div>

          </main>
            <Footer/>
        </Router>
    );

    return(
        <div className="App">
          {routing}
        </div>
    );
  }
}

export default App;
