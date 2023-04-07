import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return null;
    },
  },
});

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    dispatch(userSlice.actions.loginUser(user));
    blogService.setToken(user.token);
  };
};

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(userSlice.actions.logoutUser());
  };
};

export const checkUser = () => {
  return async dispatch => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(userSlice.actions.loginUser(user));
      blogService.setToken(user.token);
    }
  };
};

export default userSlice.reducer;
