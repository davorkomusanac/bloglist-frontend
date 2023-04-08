import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getBlogs } from "./reducers/blogsReducer";
import { checkUser } from "./reducers/userReducer";
import BlogMinimized from "./components/BlogMinimized";

const Home = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

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
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map(blog => (
        <BlogMinimized key={blog.id} blog={blog} />
      ))}
    </>
  );

  return <div>{user === null ? <LoginForm /> : blogsForm()}</div>;
};

export default Home;
