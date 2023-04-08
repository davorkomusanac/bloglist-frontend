import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = {
  users: [],
  singleUser: null,
  errorMessage: "",
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: initialState,
  reducers: {
    getAllUsers(state, action) {
      const newState = {
        users: action.payload,
        ...state.singleUser,
        errorMessage: "",
      };
      return newState;
    },
    getSingleUser(state, action) {
      const newState = {
        ...state,
        singleUser: action.payload,
        errorMessage: "",
      };
      return newState;
    },
    setErrorMessage(state, action) {
      const newState = {
        ...state,
        errorMessage: action.payload,
      };
      return newState;
    },
  },
});

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch(allUsersSlice.actions.getAllUsers(users));
  };
};

export const getSingleUser = id => {
  return async dispatch => {
    try {
      const user = await userService.getSingleUser(id);
      dispatch(allUsersSlice.actions.getSingleUser(user));
    } catch (error) {
      console.log(error.response.data.error);
      dispatch(
        allUsersSlice.actions.setErrorMessage(error.response.data.error)
      );
    }
  };
};

export default allUsersSlice.reducer;
