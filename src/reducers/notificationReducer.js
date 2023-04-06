import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    sendNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(notificationSlice.actions.sendNotification(message));
    setTimeout(() => {
      dispatch(notificationSlice.actions.removeNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
