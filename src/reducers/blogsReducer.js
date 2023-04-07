import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      return state.concat(action.payload);
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id);
    },
    upvoteBlog(state, action) {
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(blogsSlice.actions.getBlogs(blogs));
  };
};

export const createBlog = newBlog => {
  return async dispatch => {
    const savedBlog = await blogService.create(newBlog);
    dispatch(blogsSlice.actions.createBlog(savedBlog));
  };
};

export const deleteBlog = blogToDelete => {
  return async dispatch => {
    try {
      blogService.deleteBlog(blogToDelete.id);
    } catch (e) {
      console.log(e);
    }
    dispatch(blogsSlice.actions.deleteBlog(blogToDelete));
  };
};

export const upvoteBlog = blogToUpvote => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogToUpvote.id, {
      ...blogToUpvote,
      likes: blogToUpvote.likes + 1,
    });
    dispatch(blogsSlice.actions.upvoteBlog(updatedBlog));
  };
};

export default blogsSlice.reducer;
