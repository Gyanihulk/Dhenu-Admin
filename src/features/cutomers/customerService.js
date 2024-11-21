import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import httpClient from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await httpClient.get("/user?per_page=100");

  return response.data.data.data;
};

const customerService = {
  getUsers,
};

export default customerService;
