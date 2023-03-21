import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import React from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();

      function compareNum(a, b) {
        return b.likes - a.likes;
      }
      setBlogs(blogs.sort(compareNum));
    };
    fetchBlogs();
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
      const savedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(savedBlog));
      setErrorMessage(`${savedBlog.title} by ${savedBlog.author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlogDeletion = blogToDelete => {
    setBlogs(blogs.filter(el => el.id !== blogToDelete.id));
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
        <Blog
          key={blog.id}
          initialBlog={blog}
          user={user}
          handleBlogDeletion={handleBlogDeletion}
          updateLikes={(id, newObject) => blogService.update(id, newObject)}
        />
      ))}
    </>
  );

  return (
    <div>
      <h3>{errorMessage}</h3>
      {user === null ? (
        <LoginForm
          handleUser={user => setUser(user)}
          handleError={error => setErrorMessage(error)}
        />
      ) : (
        blogsForm()
      )}
    </div>
  );
};

export default App;
