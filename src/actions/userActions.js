import axios from "axios";
import { setUser, setError } from "../reducers/userReducer";
import { logoutUser as logoutUserAction } from "../reducers/userReducer";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    dispatch(setUser({
      token: response.data.token,
      username: response.data.username, 
      city: response.data.city, 
    }));
    return {}; 
  } catch (error) {
    const errorMessage = error.response.data.error;
    dispatch(setError({ error: errorMessage }));
    return { error: errorMessage };
  }
};


export const registerUser = (email, username, password, city) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", {
      email,
      username, 
      password,
      city, 
    });
    dispatch(setUser({
      token: response.data.token,
      username: response.data.username, 
      city: response.data.city, 
    }));
    return {}; 
  } catch (error) {
    const errorMessage = error.response.data.error;
    dispatch(setError({ error: errorMessage }));
    return { error: errorMessage };
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutUserAction());
};
