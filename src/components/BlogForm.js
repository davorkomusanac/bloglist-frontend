import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
/* eslint-disable react/prop-types */

const BlogForm = ({ handleCreateBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const createBlog = async event => {
    event.preventDefault();
    try {
      await handleCreateBlog({
        title,
        author,
        url,
      });

      dispatch(setNotification(`${title} by ${author} added`, 5));
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5));
    }
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            aria-label="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            aria-label="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            aria-label="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
