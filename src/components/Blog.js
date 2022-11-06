import { useState } from "react";
import blogService from "./../services/blogs";

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

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateBlogLikes = (event) => {
    event.preventDefault();
    updateLikes(blog.id, {
      likes: blog.likes + 1,
    });
    setBlog({ ...blog, likes: blog.likes + 1 });
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id);
      handleBlogDeletion(blog);
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
        likes {blog.likes} <button onClick={updateBlogLikes}>like</button>
        <br />
        {blog.author}
        <br />
        {blog.user !== null && blog.user.id === user.id ? (
          <button onClick={deleteBlog}>delete</button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
