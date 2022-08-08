import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

const initialState = {
  movies: {},
  shows: {},
  movieOrShowDetail: {},
  movieStatus: "pending",
  showStatus: "pending",
};

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMoviesAsync",
  async (term) => {
    console.log("term movie", term);
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchShowsAsync = createAsyncThunk(
  "movies/fetchShowsAsync",
  async (term) => {
    console.log("term shows", term);
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
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
    movieDetail: (state) => {
      state.movies = {};
    },
    ShowDetail: (state) => {
      state.shows = {};
    },
  },

  extraReducers: {
    [fetchMoviesAsync.pending]: (state) => {
      console.log("Pending fechmovies");
      state.movieStatus = "pending";
      return state;
    },
    [fetchMoviesAsync.fulfilled]: (state, { payload }) => {
      console.log("fechmovies Fullfilled");
      state.movies = payload;
      state.movieStatus = "resolved";
      return state;
    },
    [fetchMoviesAsync.rejected]: () => {
      console.log("fechmovies Rejected");
    },
    [fetchShowsAsync.pending]: (state, { payload }) => {
      console.log("fetchShows Fullfilled");
      state.showStatus = "pending";
      return state;
    },
    [fetchShowsAsync.fulfilled]: (state, { payload }) => {
      console.log("fetchShows Fullfilled");
      state.showStatus = "resolved";
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
export const getMovieStatus = (state) => state.movies.movieStatus;
export const getShowsStatus = (state) => state.movies.showStatus;
export const getMovieOrShowDetails = (state) => state.movies.movieOrShowDetail;

export const { removeMovieOrShowDetail, movieDetail, ShowDetail } =
  movieSlice.actions;

export default movieSlice.reducer;
