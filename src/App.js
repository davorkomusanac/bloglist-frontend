import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Header from "./components/Header";
import Notification from "./components/Notification";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  return (
    <div>
      <Notification />
      <Header />
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
