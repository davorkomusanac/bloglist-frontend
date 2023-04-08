/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, upvoteBlog } from "../reducers/blogsReducer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSpecificBlog } from "../reducers/blogsReducer";
import { checkUser } from "../reducers/userReducer";
import { useEffect } from "react";

const Blog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [blog, errorMessage] = useSelector(({ blogs }) => [
    blogs.specificBlog,
    blogs.errorMessage,
  ]);
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getSpecificBlog(id));
  }, [id]);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  const updateBlogLikes = event => {
    event.preventDefault();
    dispatch(upvoteBlog(blog));
    dispatch(setNotification(`You upvoted ${blog.title}!`, 5));
  };

  const handleDeleteBlog = event => {
    event.preventDefault();
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      dispatch(setNotification(`You deleted ${blog.title}!`, 5));
    }
  };
  if (errorMessage) return <div>{errorMessage}</div>;

  if (!blog || blog.id !== id) return null;

  return (
    <div>
      <h1>{blog.url}</h1>
      {blog.title}
      <br />
      {blog.url}
      <br />
      likes {blog.likes}{" "}
      <button id="like" onClick={updateBlogLikes}>
        like
      </button>
      <br />
      {blog.author}
      <br />
      added by {blog.user.name}
      <br />
      {blog.user !== null &&
      //When creating first time blog, blog.user is not populated and is not an object but just user id
      (blog.user === user.id || blog.user.id === user.id) ? (
        <button id="delete" onClick={handleDeleteBlog}>
          delete
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
