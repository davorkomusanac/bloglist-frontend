/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const BlogMinimized = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blog) return null;

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default BlogMinimized;
