import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

const initialState = {
  movies: {},
  shows: {},
  movieOrShowDetail: {},
};

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMoviesAsync",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchShowsAsync = createAsyncThunk(
  "movies/fetchShowsAsync",
  async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

export const fetchMovieOrShowDetailAsync = createAsyncThunk(
  "movies/fetchMovieOrShowDetailAsync",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeMovieOrShowDetail: (state) => {
      state.movieOrShowDetail = {};
    },
  },

  extraReducers: {
    [fetchMoviesAsync.pending]: () => {
      console.log("Pending fechmovies");
    },
    [fetchMoviesAsync.fulfilled]: (state, { payload }) => {
      console.log("fechmovies Fullfilled");
      state.movies = payload;
      return state;
    },
    [fetchMoviesAsync.rejected]: () => {
      console.log("fechmovies Rejected");
    },
    [fetchShowsAsync.fulfilled]: (state, { payload }) => {
      console.log("fetchShows Fullfilled");
      state.shows = payload;
      return state;
    },
    [fetchMovieOrShowDetailAsync.fulfilled]: (state, { payload }) => {
      console.log("fetchMovieOrShowDetailAsync Fullfilled");
      state.movieOrShowDetail = payload;
      return state;
    },
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getMovieOrShowDetails = (state) => state.movies.movieOrShowDetail;

export const { removeMovieOrShowDetail } = movieSlice.actions;

export default movieSlice.reducer;
