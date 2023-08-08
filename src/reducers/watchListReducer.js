import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchNext: [],
  alreadyWatched: [],
  notWatchedForAWhile: [],
  notStartedYet: [],
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addToWatchNext: (state, action) => {
      const episodeExists = state.watchNext.some(
        (show) => show.id === action.payload.id
      );

      if (!episodeExists) {
        state.watchNext.push(action.payload);
      }
    },
    addToAlreadyWatched: (state, action) => {
      if (!Array.isArray(state.alreadyWatched)) {
        state.alreadyWatched = [];
      }
    
      const episodeExists = state.alreadyWatched.some(
        (show) => show.id === action.payload.id
      );
    
      if (!episodeExists) {
        state.alreadyWatched.push(action.payload);
      }
    },
    addToNotStartedYet: (state, action) => {
      const showExists = state.notStartedYet.some(
        (show) => show.id === action.payload.id
      );

      if (!showExists) {
        state.notStartedYet.push(action.payload);
      }
      console.log('Adding to not started yet:', action.payload);

    },

    addToNotWatchedForAWhile: (state, action) => {
      state.notWatchedForAWhile.push(action.payload);
    },

    removeShow: (state, action) => {
      const showId = action.payload;
      state.watchNext = state.watchNext.filter(
        (show) => show && show.id !== showId
      );
      state.notWatchedForAWhile = state.notWatchedForAWhile.filter(
        (show) => show && show.id !== showId
      );
      state.notStartedYet = state.notStartedYet.filter(
        (show) => show && show.id !== showId
      );
      state.alreadyWatched = state.alreadyWatched.filter(
        (show) => show && show.id !== showId
      );
    },
  },
});

export const {
  addToWatchNext,
  addToAlreadyWatched,
  addToNotWatchedForAWhile,
  addToNotStartedYet,
  removeShow,
} = watchListSlice.actions;

export default watchListSlice.reducer;
