import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getSpecificBlog = async id => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const createBlogComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return res.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return res.data;
};

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const blogService = {
  getAll,
  create,
  setToken,
  update,
  deleteBlog,
  getSpecificBlog,
  createBlogComment,
};

export default blogService;
