import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
