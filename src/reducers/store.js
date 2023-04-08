import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogsReducer from "./blogsReducer";
import userReducer from "./userReducer";
import allUsersReducer from "./allUsersReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    allUsers: allUsersReducer,
  },
});

export default store;
