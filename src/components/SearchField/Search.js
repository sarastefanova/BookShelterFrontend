import React from "react";

const SearchFiled=(props)=>{


    const onSearch=(e)=>{
        e.preventDefault();

        props.onSearch(e.target.searchTerm.value);
        e.target.searchTerm.value="";
    }
    return(
      <form onSubmit={onSearch  }>
          <div className="input-group">
              <input  type="text" name="searchTerm"  className="form-control" placeholder="Search for book, author ..."/>
              <span className="input-group-btn">  <button className="btn btn-outline-danger my-2 my-sm-0 " type="submit"><i className="fa fa-search"/>Search</button></span>
          </div>

      </form>
    );
};
export default SearchFiled;