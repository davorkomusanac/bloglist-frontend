/* eslint-disable react/prop-types */
import { useState } from "react";
import blogService from "./../services/blogs";
import loginService from "./../services/login";
import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = ({ handleUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      handleUser(user);
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Welcome back, ${user.name}!`, 5));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
