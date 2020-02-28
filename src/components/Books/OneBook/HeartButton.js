import React, {Component} from "react";
import axios from '../../../cutom-axios/axios'
import './OneGridBookStyle.css'
class HeartButton extends Component{

    constructor(props){
        super(props);

        this.state={
            userHasTheBook:""
        }
    }


    componentDidMount() {
        // axios.get("/books/checkIfUserHasThisBookFav/"+this.props.id+"/"+this.props.bookName).then((result)=>{
        //     this.setState({
        //          userHasTheBook:result.data
        //     })
        //     debugger;
        // })
    }

    render() {

        let pom="";
        if(this.props.userHasTheBook===false){
            debugger;
            // this.setState({
            //     color:"#cc0044"
            // })
            pom="#cc0044";
        }
        if(this.props.userHasTheBook===true){
            debugger;
            // this.setState({
            //     color:"yellow"
            // })
            pom="yellow";
        }

        return(
            <button onClick={this.addFavourite} href="#" className={"btn favourite"} title="Favourite">
            <i className="fa fa-heart favouriteHeart " style={{color:pom}}/>
            </button>
        )
    }
}
export default HeartButton;