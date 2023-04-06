import { useSelector } from "react-redux";
import React from "react";

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification;
  });

  const style = {
    border: "solid",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  };
  return notification === "" ? null : <div style={style}>{notification}</div>;
};

export default Notification;
