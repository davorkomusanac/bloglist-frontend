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

const App = () => {
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
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
      {user === null ? (
        <LoginForm handleUser={user => setUser(user)} />
      ) : (
        blogsForm()
      )}
    </div>
  );
};

export default App;
