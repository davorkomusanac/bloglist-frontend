import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import React from "react";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getBlogs } from "./reducers/blogsReducer";
import { checkUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCreateBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(newBlog));
    } catch (e) {
      throw e;
    }
  };

  const blogsForm = () => (
    <>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  );

  return (
    <div>
      <Notification />
      {user === null ? <LoginForm /> : blogsForm()}
    </div>
  );
};

export default App;
