import React, {Component} from "react";
import {Link} from "react-router-dom"
import './OneGridBookStyle.css'
import Confirm from './Confirm'
class OneGridBook extends Component{
        state={
             url : "",
            color: "#cc0044",
            isClicked:false
        }
        constructor(props){
            super(props);
        }

    addFavourite=(e)=>{
        //console.log(this.props);
        this.setState({color:'yellow',isClicked:true})
        this.props.addFavourite(this.props.bookName)


    }

    changeColor(){
        // this.setState({colorBtn: !this.state.black}) ovaa e za da moze da se dodava i da se brise na klik na srceto

    }

    render() {
        const {btn_class} = this.state.colorBtn ? "favourite" : "favouriteClicked";
      //  console.log(Object.values(this.props.author)[3])
      //   console.log(this.props.author)
      //   console.log(this.props.okFavourites)
      //   if(this.props.okFavourites){
      //
      //   }



        return(

            <div className={this.props.colClass}>
                <div className="card ">
                    <div className="book">
                        {this.cardHeader()}
                        {this.Example()}

                        {this.cardFooter()}

                    </div>
                </div>
            </div>
        )

    }

    Example = () => {
            return(
                <div>
                    <Link to={"/detailsBook/"+this.props.book.name}>
                        <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" className="card-img-top imgWidthAndHeight"/>

                    </Link>
                    <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
                        <i className="fa fa-heart favouriteHeart " style={{color:this.state.color}}/>
                    </button>
                </div>
            )
    }

    cardHeader(){

        return (<div className="card-header">
            <div className="row">
                <div className="col-md-6 font-weight-bold font-italic headerText">
                    <span className="fontNameBook">{this.props.book.name}</span>
                </div>
                {/*<div className="headerText">*/}
                {/*    {this.props.book.name}*/}
                {/*</div>*/}

                <div className="col-md-6 text-right ">

                    <Link to={"/editBook/"+this.props.book.name}  title="Edit" className="btn btn-default roundedLinksBooks" ><i className="fa fa-pencil"/></Link>
                    <Confirm onDelete={this.props.onDelete} bookName={this.props.bookName}/>


                </div>
            </div>
        </div>);
    }



    cardBody(){
       //const Example = () => <img src={`data:image/jpeg;base64,${this.props.book.file}`}  alt="" class="card-img-top"/>
        return(

          <div className="card-body">
               {/*<Example/>*/}
          </div>
        );
    }

    cardFooter(){
        return(
            <div className="card-footer">
                <div className="row">
                    <div className="col-md-12 ">
                        <span className="colorH  float-left"><i className="fa fa-book"/> <Link to={"/detailsAuthor/"+this.props.book.author.nameAndSurname}><span className="colorH">Written by {this.props.book.author.nameAndSurname}</span></Link></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default OneGridBook;