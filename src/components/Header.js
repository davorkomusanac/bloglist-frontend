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

  const titleStyle = {
    textDecoration: "none",
    color: "black",
    ":hover": {
      color: "black",
    },
    ":active": {
      color: "black",
    },
  };

  const headerStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: 10,
    display: "inline-block",
  };

  const logoutDivStyle = {
    paddingBottom: 10,
  };

  return (
    <div>
      <Link to="/" style={titleStyle}>
        <span style={headerStyle}>blogs</span>
      </Link>
      <div style={logoutDivStyle}>
        {user.name} logged in
        <br />
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Header;
