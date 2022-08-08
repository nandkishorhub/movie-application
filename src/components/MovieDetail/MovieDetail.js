import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchMovieOrShowDetailAsync,
  getMovieOrShowDetails,
  removeMovieOrShowDetail,
} from "../../features/movies/movieSlice";
import Loader from "../Loader/Loader";
import "./MovieDetail.scss";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const data = useSelector(getMovieOrShowDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieOrShowDetailAsync(imdbID));
    console.log("Useffect Movie detail");
    return () => {
      dispatch(removeMovieOrShowDetail());
    };
  }, [imdbID, dispatch]);

  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
              </span>
              <span>
                Votes <i className="fa fa-thumbs-up"></i> : {data.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i> : {data.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i> : {data.Year}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Generes</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Language</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
