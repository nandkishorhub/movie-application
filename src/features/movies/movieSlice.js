import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Here we have desctructed action.payload to {payload}
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
});

export const getAllMovies = (state) => state.movies.movies;

export const { addMovies } = movieSlice.actions;

export default movieSlice.reducer;
