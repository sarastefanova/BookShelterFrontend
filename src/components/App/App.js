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
import BookAddWithImg from '../Books/AddBookImg/AddBookImg';
import GridBooks from '../Books/GridBooks/allBooks';
import AddAuthorImg from "../Author/AddAuthorImg/AddAuthorImg";
import DetailsAuthor from '../Author/DetailsAuthor/DetailsAuthor';
import DetailsBook from '../Books/DetailsBook/DetailsBook'

class App extends Component{


    constructor(props){
        super(props);
        this.state={
            authors: [],
            books:[],
            totalPages:0,
            pageSize:6
        }
    }

    componentDidMount() {

        this.loadBooksPaginate();
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

    createAuthorImg=(author)=>{
        AuthorService.addNewAuthorWithImg(author).then((response)=>{
            const author = response.data;
            console.log(response+"img");

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
        BookService.fetchBooksTermsPaged(page,this.state.pageSize).then((data) => {
            this.setState({
                books: data.data.content,
                page:data.data.page,
                pageSize:data.data.pageSize,
                totalPages:data.data.totalPages
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

    deleteBook=(i)=>{
        BookService.deleteBook(i).then((response)=>{
            this.setState((state)=>{
                const books=state.books.filter((t)=>{
                    return t.name!==i;
                });
                return {books}
            })
        })
    }

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

                {/*Bez slika dodavanje na avtor*/}
                {/*<Route path={"/addAuthor"} render={()=><AuthorAdd onNewAuthorAdded={this.createAuthor}/>}>*/}
                {/*</Route>*/}

                {/*Bez slika dodavanje na kniga*/}
                {/*<Route path={"/addBook"} render={()=><BookAdd onNewBookAdded={this.createBook}/>}>*/}
                {/*</Route>*/}

                {/*Dodavanje na kniga so slika*/}
                <Route path={"/addBook"} render={()=><BookAddWithImg books={this.state.books} onNewBookAddedWithImg={this.createBookImg}/>}>
                </Route>

                {/*Dodavanje na avtor so slika*/}
                <Route path={"/addAuthor"} render={()=><AddAuthorImg author={this.state.author} onNewAuthorAddedImg={this.createAuthorImg}/>}>
                </Route>

                <Route path="/editAuthor" render={()=>
                    <AuthorEdit />}>
                </Route>

                <Route path="/editUser" render={()=>
                    <EditUser />}>
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

                <Route path={"/allBooks"} render={()=><GridBooks onDelete={this.deleteBook} onPageClick={this.loadBooksPaginate} totalPages={this.state.totalPages} books={this.state.books}/>}>
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
