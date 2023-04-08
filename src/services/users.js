import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getSingleUser = async id => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const userService = {
  getAll,
  getSingleUser,
};

export default userService;
