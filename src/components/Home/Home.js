import React from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesAsync,
  fetchShowsAsync,
  getMovieOrShowDetails,
} from "../../features/movies/movieSlice";
import { useLocation } from "react-router-dom";

const Home = () => {
  const moviesORShows = useSelector(getMovieOrShowDetails);
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";

  useEffect(() => {
    if (Object.keys(moviesORShows).length === 0) {
      dispatch(fetchMoviesAsync(movieText));
      dispatch(fetchShowsAsync(showText));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
