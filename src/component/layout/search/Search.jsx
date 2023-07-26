import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import MetaData from "../metaData/MetaData";

const Search = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate("/products/" + keyword);
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MetaData title="Search Products -- Ecommerce" />
      <form  className="searchBox" onSubmit={searchSubmitHandler}>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search a Product ...."
            
            onChange={(e) => setKeyword(e.target.value)}
          />
          <BiSearch className="search-icon" onClick={searchSubmitHandler}/>
        </div>
      </form>
    </>
  );
};

export default Search;
