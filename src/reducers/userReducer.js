// src/reducers/userReducer.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: null,
    username: null, 
    city: null, 
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("setUser reducer called", action.payload);
      state.isLoggedIn = !!action.payload.token; // Check if token is not null
      state.token = action.payload.token;
      state.username = action.payload.username; 
      state.city = action.payload.city; 
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
    },
  },
});

export const { setUser, setError, logoutUser } = userSlice.actions;

export default userSlice.reducer;
