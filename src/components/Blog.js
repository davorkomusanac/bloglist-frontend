/* eslint-disable react/prop-types */
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, upvoteBlog } from "../reducers/blogsReducer";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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

  if (!blog) return null;

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="hiddenBlogTest">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="expandedBlogTest">
        <h1>{blog.url}</h1>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
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
        {blog.user !== null &&
        //When creating first time blog, blog.user is not populated and is not an object but just user id
        (blog.user === user.id || blog.user.id === user.id) ? (
          <button id="delete" onClick={handleDeleteBlog}>
            delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
