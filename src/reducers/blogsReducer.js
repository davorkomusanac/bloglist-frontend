import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = {
  blogs: [],
  specificBlog: null,
  errorMessage: "",
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    getBlogs(state, action) {
      const newState = {
        ...state,
        blogs: action.payload,
        errorMessage: "",
      };

      return newState;
    },
    createBlog(state, action) {
      const newState = {
        ...state,
        blogs: state.blogs.concat(action.payload),
        errorMessage: "",
      };

      return newState;
    },
    deleteBlog(state, action) {
      const newState = {
        blogs: state.blogs.filter(blog => blog.id !== action.payload.id),
        specificBlog:
          action.payload.id === state.specificBlog.id
            ? null
            : state.specificBlog,
        errorMessage: "",
      };

      return newState;
    },
    upvoteBlog(state, action) {
      const newState = {
        blogs: state.blogs.map(blog =>
          blog.id === action.payload.id ? action.payload : blog
        ),
        specificBlog:
          action.payload.id === state.specificBlog.id
            ? action.payload
            : state.specificBlog,
        errorMessage: "",
      };

      return newState;
    },
    getSpecificBlog(state, action) {
      const newState = {
        ...state,
        specificBlog: action.payload,
        errorMessage: "",
      };

      return newState;
    },
    setErrorMessage(state, action) {
      const newState = {
        ...state,
        errorMessage: action.payload,
      };

      return newState;
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

export const getSpecificBlog = id => {
  return async dispatch => {
    try {
      const blog = await blogService.getSpecificBlog(id);
      dispatch(blogsSlice.actions.getSpecificBlog(blog));
    } catch (error) {
      console.log(error.response.data.error);
      dispatch(blogsSlice.actions.setErrorMessage(error.response.data.error));
    }
  };
};

export default blogsSlice.reducer;
