import React from "react";

const SearchFiled=(props)=>{


    const onSearch=(e)=>{
        e.preventDefault();

        props.onSearch(e.target.searchTerm.value);
        e.target.searchTerm.value="";
    }
    return(
      <form onSubmit={onSearch  }>
          <input  type="text" name="searchTerm"  className="form-control" placeholder="Search for book, author ..."/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    );
};
export default SearchFiled;