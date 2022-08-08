import React from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMoviesAsync,
  fetchShowsAsync,
} from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMoviesAsync());
    dispatch(fetchShowsAsync());
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
