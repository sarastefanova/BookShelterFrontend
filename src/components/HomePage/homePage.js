
import Img from "react-image";
import React, {Component} from "react";
import './homePage.css';
import bookImg from '../AllPhotos/books.png';
import bookReason from '../AllPhotos/booksReason.png';

import mailReason from '../AllPhotos/mail.png'
import PhotoWithText from './PhotoWithText/photoWithText';
import {Link} from "react-router-dom";
import NewestBooks from '../HomePage/NewestBooks/AllNewestBooks/allNewestBook'

class homePage extends Component{

    constructor(props){
        super(props);
        this.state={
            booksNewest:[]
        }
    }

    render() {

        return(
            <div className="colorContainer ">

                <PhotoWithText/>

                <hr/>
                <div>
                    <NewestBooks booksNewest={this.props.booksNewest}/>
                </div>
                <div className="mt-5">
                    <Link to={"/allBooks"} className="btn ColorBtn btnBooksNewest btn-primary">See more of our books!</Link>
                </div>

                <div className="container  containerHeigth">
                    <hr/>
                    <div className="row ">
                        <div className="col-md-6 borderCol">
                            {this.allTheBooks()}
                        </div>
                        <div className="col-md-6">
                            {this.whyShowHere()}
                        </div>
                    </div>

                </div>
            </div>



        );
    }

    allTheBooks(){
        return(
          <div className="row text-center align-content-center">
              <div className="row">
                  <div className="col-md-2">
                      <Img src={bookImg} className="bookImage"/>
                  </div>
                  <div className="col-md-3 text-center">
                      <div className="mt-1">
                          <p className="font-weight-bold">The cheapest books here!</p>
                          <p>Save up to 90% on millions of titles</p>
                      </div>
                  </div>
              </div>

          </div>

        );
    }

    whyShowHere(){
        return(

            <div className="row ">

                <div className="col-md-3">
                    <Img src={bookReason} className="rounded bookImage"/>
                    <p>30-day Money
                        Back Guarantee -
                        no questions asked</p>
                </div>
                <div className="col-md-3">
                    <Img src={mailReason} className="rounded bookImage"/>
                    <p>All textbook rentals come with free return shipping</p>
                </div>

            </div>
        );
    }


};
export default homePage;