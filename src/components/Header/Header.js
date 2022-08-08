import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  fetchMoviesAsync,
  fetchShowsAsync,
} from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchMoviesAsync(term));
    dispatch(fetchShowsAsync(term));
    navigate("/");
    setTerm("");
  };

  const onChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie Store</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search movies or shows"
            onChange={onChange}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
