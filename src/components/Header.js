import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, logoutUser } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  if (user === null) return null;

  // const titleStyle = {
  //   textDecoration: "none",
  //   color: "black",
  //   ":hover": {
  //     color: "black",
  //   },
  //   ":active": {
  //     color: "black",
  //   },
  // };

  const headerStyle = {
    marginRight: 10,
  };

  const logoutDivStyle = {
    display: "inline-block",
  };

  const logoutButtonStyle = {
    marginLeft: 10,
  };

  const mainHeaderStyle = {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f2f2f2",
  };

  return (
    <div style={mainHeaderStyle}>
      <Link to="/" style={headerStyle}>
        blogs
      </Link>
      <Link to="/users" style={headerStyle}>
        users
      </Link>
      <div style={logoutDivStyle}>
        {user.name} logged in
        <button type="button" onClick={handleLogout} style={logoutButtonStyle}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Header;
