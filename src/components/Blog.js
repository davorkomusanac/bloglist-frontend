/* eslint-disable react/prop-types */
import { useState } from "react";
import blogService from "./../services/blogs";
import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ initialBlog, user, handleBlogDeletion, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const [blog, setBlog] = useState(initialBlog);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateBlogLikes = event => {
    event.preventDefault();
    updateLikes(blog.id, {
      likes: blog.likes + 1,
    });
    setBlog({ ...blog, likes: blog.likes + 1 });
    dispatch(setNotification(`You upvoted ${blog.title}!`, 5));
  };

  const deleteBlog = event => {
    event.preventDefault();
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id);
      handleBlogDeletion(blog);
      dispatch(setNotification(`You deleted ${blog.title}!`, 5));
    }
  };

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
          <button id="delete" onClick={deleteBlog}>
            delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
